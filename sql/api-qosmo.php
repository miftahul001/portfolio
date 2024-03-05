<?php

if (strtoupper($_SERVER['REQUEST_METHOD']) === 'POST') {
	
	if (!isset($_POST['cmd'])) {
		echo json_encode(['status' => 400, 'msg' => 'cmd not set!']);
		exit();
	}
	
	$db = new mysqli("HOST", "USER", "PASSWORD", "DB");
	
	if ($db -> connect_errno) {
		echo json_encode(['status' => 500, 'msg' => $db -> connect_error]);
		exit();
	}
	
	switch ($_POST['cmd']) {
		
		case 'site-list' :
			$q = "SELECT yearweek, site_id, title, product, treg, region, witel, kabupaten,
				latency, packetloss, jitter, cx_latency, cx_packetloss, clear_notclear AS status
				FROM site_list4
				WHERE yearweek=(SELECT MAX(yearweek) FROM site_list4)";
			
			$q = $db->query($q);
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'site-notclear' :
			$q = "SELECT * from site_list4
				WHERE clear_notclear='NOT CLEAR'
				AND yearweek=(SELECT MAX(yearweek) FROM site_list4)";
			
			$q = $db->query($q);
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'total-sites' :
			$q = "SELECT COUNT(*)AS t, SUM(IF(clear_notclear='NOT CLEAR',1,0))AS nc FROM site_list4
				WHERE yearweek=(SELECT MAX(yearweek) FROM site_list4)";
			
			$q = $db->query($q);
			
			$a = '';
			if ($b = $q->fetch_assoc()) { $a = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'count-notclear' :
			
			$q = "SELECT ((a.lat1+latpljit)-(a.latpl1+a.latjit1))AS lat,
				((a.pl1+latpljit)-(a.latpl1+a.pljit1))AS pl,
				((a.jit1+latpljit)-(a.latjit1+a.pljit1))AS jit,
				(a.latpl1-a.latpljit)AS latpl,
				(a.latjit1-a.latpljit)AS latjit,
				(a.pljit1-a.latpljit)AS pljit,
				a.latpljit
				FROM
				(SELECT SUM(IF(latency='NOT CLEAR',1,0))AS lat1,
				SUM(IF(packetloss='CONSECUTIVE',1,0))AS pl1,
				SUM(IF(jitter='NOT-CLEAR',1,0))AS jit1,
				SUM(IF(latency='NOT CLEAR' AND packetloss='CONSECUTIVE',1,0))AS latpl1,
				SUM(IF(latency='NOT CLEAR' AND jitter='NOT-CLEAR',1,0))AS latjit1,
				SUM(IF(packetloss='CONSECUTIVE' AND jitter='NOT-CLEAR',1,0))AS pljit1,
				SUM(IF(latency='NOT CLEAR' AND packetloss='CONSECUTIVE' AND jitter='NOT-CLEAR',1,0))AS latpljit,
				clear_notclear FROM site_list4
				WHERE clear_notclear='NOT CLEAR' AND yearweek=(SELECT MAX(yearweek) FROM site_list4))a";
			
			$q = $db->query($q);
			
			$a = '';
			if ($b = $q->fetch_assoc()) { $a = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'treg-notclear' :
			
			$q = "SELECT treg, COUNT(*)AS t, SUM(IF(clear_notclear='NOT CLEAR',1,0))AS nc
				FROM site_list4 WHERE yearweek=(SELECT MAX(yearweek) FROM site_list4)
				GROUP BY treg ORDER BY treg";
			
			$q = $db->query($q);
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'detail-city-unclear' :
			
			$q = "SELECT treg, kabupaten, COUNT(*)AS nc FROM site_list4
				WHERE clear_notclear='NOT CLEAR' AND yearweek=(SELECT MAX(yearweek) FROM site_list4)
				GROUP BY treg, kabupaten ORDER BY nc DESC LIMIT 10";
			
			$q = $db->query($q);
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'trend-notclear' :
			
			$q = "SELECT a.yearweek, a.treg, COUNT(*)AS t FROM
				(SELECT yearweek, site_id, treg FROM site_list4
				WHERE clear_notclear='NOT CLEAR' ORDER BY yearweek DESC)a
				GROUP BY yearweek, treg
				ORDER BY yearweek DESC, treg
				LIMIT 84";
			
			$q = $db->query($q);
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'summary-page1' :
			
			$q = "SELECT yearweek, treg, COUNT(capacity)as cap, COUNT(ISR)as isr,
				COUNT(gangguan)AS gang, COUNT(tsel)AS tsel, COUNT(unspec_quality)AS unspec
				FROM site_list4
				WHERE yearweek=(SELECT MAX(yearweek) FROM site_list4)
				AND treg IS NOT NULL AND TRIM(treg)<>''
				GROUP BY treg, yearweek ORDER BY treg";
			
			$q = $db->query($q);
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		
		// ======================================= page 2 ==========================================
		case 'get-bulan' :
			
			$q = $db->query("SELECT DISTINCT DATE_FORMAT(CREATIONDATE, '%Y-%m')AS tgl
				FROM cnq.nossa_telkomsel ORDER BY tgl DESC LIMIT 13");
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'avg-ticket-monthly' :
			//TROUBLE_HEADLINE like '%TSEL_CNQ%'
			$q = $db->query("SELECT COUNT(TICKETID)AS ticket FROM cnq.nossa_telkomsel WHERE
				DATE_FORMAT(CREATIONDATE, '%Y-%m')>DATE_FORMAT(DATE_SUB('" . $_POST['tgl'] . "', INTERVAL 1 MONTH), '%Y-%m')
				AND TROUBLE_HEADLINE like '%" . $_POST['trouble-headline'] . "%'");
			
			$d = '';
			if ($row = $q->fetch_assoc()) { $d = $row; }
			$q->free_result();
			
			$q = $db->query("SELECT AVG(TTR_CUSTOMER_JAM)AS mttr FROM cnq.nossa_telkomsel WHERE
				TROUBLE_HEADLINE like '%" . $_POST['trouble-headline'] . "%' AND
				DATE_FORMAT(CREATIONDATE, '%Y-%m')>DATE_FORMAT(DATE_SUB('" . $_POST['tgl'] . "', INTERVAL 12 MONTH), '%Y-%m')");
			
			$a = '';
			if ($row = $q->fetch_assoc()) { $a = $row; }
			$q->free_result();
			
			$q = $db->query("SELECT SUM(IF(TTR_CUSTOMER_JAM>48,1,0))AS a, COUNT(TTR_CUSTOMER_JAM)AS b
				FROM cnq.nossa_telkomsel where TROUBLE_HEADLINE like '%" . $_POST['trouble-headline'] . "%'
				AND DATE_FORMAT(CREATIONDATE, '%Y-%m')>DATE_FORMAT(DATE_SUB('" . $_POST['tgl'] . "', INTERVAL 12 MONTH), '%Y-%m')");
			
			$b = '';
			if ($row = $q->fetch_assoc()) { $b = $row; }
			$q->free_result();
			
			$q = $db->query("SELECT SUM(IF(TTR_CUSTOMER_JAM<=48 AND STATUS='CLOSED',1,0))AS a, COUNT(TTR_CUSTOMER_JAM)AS b
				FROM cnq.nossa_telkomsel where TROUBLE_HEADLINE like '%" . $_POST['trouble-headline'] . "%'
				AND DATE_FORMAT(CREATIONDATE, '%Y-%m')>DATE_FORMAT(DATE_SUB('" . $_POST['tgl'] . "', INTERVAL 12 MONTH), '%Y-%m')");
			
			$c = '';
			if ($row = $q->fetch_assoc()) { $c = $row; }
			$q->free_result();
			
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => [$a, $b, $c, $d]]);
			
		break;
		
		case 'ticket-garansi' :
			
			$q = $db->query("SELECT a1.status, b1.Site_ID_FE_ACT AS garansi FROM (SELECT a.site_id, b.* FROM
				(SELECT site_id, unspec_quality FROM site_list4
				WHERE unspec_quality IS NOT NULL AND yearweek=(SELECT MAX(yearweek) FROM site_list4)
				AND treg IS NOT NULL AND TRIM(treg)<>'')a INNER JOIN 
				(SELECT trouble_headline, status FROM cnq.nossa_telkomsel
				WHERE trouble_headline LIKE '%" . $_POST['trouble-headline'] . "%')b
				ON a.site_id=SUBSTR(b.trouble_headline, LOCATE('_', b.trouble_headline, 10)+1, 6))a1
				LEFT JOIN site_garansi b1
				ON a1.site_id=b1.Site_ID_NE_ACT
				AND SUBSTR(a1.trouble_headline, LOCATE('_TO_', a1.trouble_headline, 10)+4, 6)=b1.Site_ID_FE_ACT");
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'ticket-status' :
			
			$q = $db->query("SELECT TK_REGION AS treg, COUNT(*)AS tot, SUM(IF(STATUS='CLOSED',1,0))AS closed,
				SUM(IF(STATUS='SLAHOLD',1,0))AS pending
				FROM cnq.nossa_telkomsel where TROUBLE_HEADLINE like '%" . $_POST['trouble-headline'] . "%'
				AND DATE_FORMAT(CREATIONDATE, '%Y-%m')>DATE_FORMAT(DATE_SUB('" . $_POST['tgl'] . "', INTERVAL 12 MONTH), '%Y-%m')
				GROUP BY TK_REGION ORDER BY TK_REGION");
			
			$a = [];
			while($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'popup-ticket-status' :
			
			$q = $db->query("SELECT ticketid, tk_region, status FROM cnq.nossa_telkomsel WHERE
				DATE_FORMAT(CREATIONDATE, '%Y-%m')>DATE_FORMAT(DATE_SUB('" . $_POST['tgl'] . "', INTERVAL 12 MONTH), '%Y-%m')
				AND TROUBLE_HEADLINE like '%" . $_POST['trouble-headline'] . "%' ORDER BY TK_REGION");
			
			$a = [];
			while($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'ticket-48h' :
			
			$q = $db->query("SELECT REPLACE(TK_REGION, 'REG-', 'TREG') AS treg, COUNT(*)AS a
				FROM cnq.nossa_telkomsel where TROUBLE_HEADLINE like '%" . $_POST['trouble-headline'] . "%'
				AND TTR_CUSTOMER_JAM>48 AND STATUS<>'CLOSED'
				AND DATE_FORMAT(CREATIONDATE, '%Y-%m')>DATE_FORMAT(DATE_SUB('" . $_POST['tgl'] . "', INTERVAL 12 MONTH), '%Y-%m')
				GROUP BY TK_REGION");
			
			$a = [];
			while ($row = $q->fetch_assoc()) { $a[] = $row; }
			$q->free_result();
			
			$q = $db->query("SELECT ticketid, REPLACE(TK_REGION, 'REG-', 'TREG') AS treg, ttr_customer_jam
				FROM cnq.nossa_telkomsel where TROUBLE_HEADLINE like '%" . $_POST['trouble-headline'] . "%'
				AND TTR_CUSTOMER_JAM>48 AND STATUS<>'CLOSED'
				AND DATE_FORMAT(CREATIONDATE, '%Y-%m')>DATE_FORMAT(DATE_SUB('" . $_POST['tgl'] . "', INTERVAL 12 MONTH), '%Y-%m')");
			
			$b = [];
			while ($row = $q->fetch_assoc()) { $b[] = $row; }
			$q->free_result();
			
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => [$a, $b]]);
			
		break;
		
		case 'total-ticket-monthly' :
			
			$q = $db->query("SELECT DATE_FORMAT(CREATIONDATE, '%y-%m')AS tgl, COUNT(TICKETID)AS t,
				tk_region FROM cnq.nossa_telkomsel WHERE TROUBLE_HEADLINE like '%" . $_POST['trouble-headline'] . "%' AND
				TK_REGION LIKE 'REG%' AND CREATIONDATE>SUBDATE('" . $_POST['tgl'] . "', INTERVAL 11 MONTH)
				GROUP BY tgl, tk_region ORDER BY tgl DESC, tk_region");
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'total-ticket-weekly-popup' :
			
			$q = $db->query("SELECT YEARWEEK(CREATIONDATE)AS tgl, COUNT(TICKETID)AS t, tk_region
				FROM cnq.nossa_telkomsel WHERE TROUBLE_HEADLINE like '%" . $_POST['trouble-headline'] . "%' AND
				TK_REGION LIKE 'REG%' GROUP BY tgl, tk_region ORDER BY tgl DESC, tk_region LIMIT 35");
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'mttr-ticket-1-page2' :
			
			$q = $db->query("SELECT CASE
				WHEN trouble_headline LIKE 'TSEL_CNQ_RADIO%' THEN 'Radio'
				WHEN trouble_headline LIKE 'TSEL_CNQ_GPON%' THEN 'Radio'
				WHEN trouble_headline LIKE 'TSEL_CNQ_METRO_TRUNK%' THEN 'Metro_Trunk'
				WHEN trouble_headline LIKE 'TSEL_CNQ_METRO%' THEN 'FO'
				ELSE NULL END AS a, ticketid, ttr_customer_jam, tk_region
				FROM cnq.nossa_telkomsel WHERE
				(trouble_headline LIKE 'TSEL_CNQ_RADIO%' OR
				trouble_headline LIKE 'TSEL_CNQ_GPON%' OR
				trouble_headline LIKE 'TSEL_CNQ_METRO%')
				AND tk_region LIKE 'REG-%' ORDER BY a, tk_region");
			
			$a = [];
			while ($row = $q->fetch_assoc()) { $a[] = $row; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			//SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(trouble_headline, '_', 4), '_', -1) AS sid1,
			//IF(LOCATE('_TO_', trouble_headline, 10)>0, SUBSTRING_INDEX(SUBSTRING_INDEX(trouble_headline, '_TO_', -1), '_', 1), NULL) AS sid2
			//FROM cnq.nossa_telkomsel WHERE trouble_headline LIKE '%TSEL_CNQ%' AND tk_region LIKE 'REG-%'
			
			//SELECT ticketid, SUBSTR(trouble_headline, LOCATE('_', trouble_headline, 10)+1, 6) AS sid,
			//IF(LOCATE('_TO_', trouble_headline, 10)>0, SUBSTR(trouble_headline, LOCATE('_TO_', trouble_headline, 10)+4, 6), NULL) AS sid1, 
			//assetnum, trouble_headline FROM cnq.nossa_telkomsel
			//WHERE trouble_headline LIKE '%TSEL_CNQ%' LIMIT 10
			
		break;
		
		case 'mttr-ticket-2-page2' :
			/*
			$q = $db->query("SELECT tk_symptoms, COUNT(*)AS t FROM cnq.nossa_telkomsel
				WHERE trouble_headline LIKE '%TSEL_CNQ%' AND tk_symptoms LIKE '%QUALITY%'
				GROUP BY tk_symptoms");
			
			$q = $db->query("SELECT ticketid, assetnum, ttr_customer_jam, desc_subcategory, tk_symptoms, desc_wo
				FROM cnq.nossa_telkomsel WHERE trouble_headline LIKE '%TSEL_CNQ%' AND tk_symptoms LIKE '%QUALITY%'
				AND (desc_subcategory LIKE 'RADIO % - %' OR desc_subcategory LIKE 'FO % - %')
				ORDER BY tk_symptoms");
			
			$q = $db->query("SELECT ticketid, desc_subcategory, tk_region, ttr_customer_jam
				FROM cnq.nossa_telkomsel WHERE trouble_headline LIKE '%TSEL_CNQ%' AND tk_symptoms LIKE '%QUALITY%'
				AND (desc_subcategory LIKE 'RADIO % - %' OR desc_subcategory LIKE 'FO % - %')
				AND tk_region LIKE 'REG-%' ORDER BY desc_subcategory");
			*/
			
			$q = $db->query("SELECT IF(LEFT(desc_subcategory, 5)='RADIO', CONCAT('RADIO -', 
				SUBSTRING_INDEX(desc_subcategory, '-', -1)), desc_subcategory)AS desc1,
				AVG(ttr_customer_jam)AS ttr, COUNT(*)AS t FROM cnq.nossa_telkomsel
				WHERE trouble_headline LIKE '%TSEL_CNQ%' AND tk_symptoms LIKE '%QUALITY%'
				AND (desc_subcategory LIKE 'RADIO % - %' OR desc_subcategory LIKE 'FO % - %')
				AND tk_region LIKE 'REG-%' GROUP BY desc1 ORDER BY desc1");
			
			$a = [];
			while ($row = $q->fetch_assoc()) { $a[] = $row; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'ticket-open' :
			$q = $db->query("SELECT ticketid, tk_region, ownergroup, ttr_customer_jam FROM
				cnq.nossa_telkomsel where TROUBLE_HEADLINE like '%" . $_POST['trouble-headline'] . "%' AND STATUS<>'CLOSED'");
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'mttrTicketPerRegion' :
			
			$q = $db->query("SELECT REPLACE(TK_REGION, 'REG-', 'TREG') AS treg, AVG(TTR_CUSTOMER_JAM)AS mttr
				FROM cnq.nossa_telkomsel where TROUBLE_HEADLINE like '%" . $_POST['trouble-headline'] . "%' AND
				DATE_FORMAT(CREATIONDATE, '%Y-%m')>DATE_FORMAT(DATE_SUB('" . $_POST['tgl'] . "', INTERVAL 12 MONTH), '%Y-%m')
				GROUP BY TK_REGION ORDER BY mttr DESC");
			
			$a = [];
			while ($row = $q->fetch_assoc()) { $a[] = $row; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'mttr-ticket-region-popup' :
			
			$q = $db->query("SELECT REPLACE(TK_REGION, 'REG-', 'TREG') AS treg, witel,
				DATE_FORMAT(CREATIONDATE, '%Y-%m') AS tgl, AVG(TTR_CUSTOMER_JAM)AS mttr
				FROM cnq.nossa_telkomsel where TROUBLE_HEADLINE like '%" . $_POST['trouble-headline'] . "%' AND
				DATE_FORMAT(CREATIONDATE, '%Y-%m')>DATE_FORMAT(DATE_SUB('" . $_POST['tgl'] . "', INTERVAL 12 MONTH), '%Y-%m')
				GROUP BY TK_REGION, witel, tgl ORDER BY tgl DESC, treg, witel");
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'mttr-ticket-region-popup-1' :
			
			$q = $db->query("SELECT tk_region, AVG(TTR_CUSTOMER_JAM)AS mttr, witel
				FROM cnq.nossa_telkomsel where TROUBLE_HEADLINE like '%" . $_POST['trouble-headline'] . "%' AND
				DATE_FORMAT(CREATIONDATE, '%Y-%m')>DATE_FORMAT(DATE_SUB('" . $_POST['tgl'] . "', INTERVAL 12 MONTH), '%Y-%m')
				GROUP BY tk_region, witel ORDER BY mttr DESC");
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'non-liga-ticket' :
			
			$q = $db->query("SELECT yearweek, site_id, treg, capacity, ISR, gangguan, tsel, unspec_quality
				FROM site_list4 WHERE yearweek=(SELECT MAX(yearweek) FROM site_list4)");
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'capacity-page2' :
			
			$q = $db->query("SELECT capacity, COUNT(capacity)AS t FROM site_list4
				WHERE capacity IS NOT NULL AND yearweek=(SELECT MAX(yearweek) FROM site_list4)
				AND treg IS NOT NULL AND TRIM(treg)<>''
				GROUP BY capacity");
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'tsel-page2' :
			
			$q = $db->query("SELECT tsel, COUNT(tsel)AS t FROM site_list4
				WHERE tsel IS NOT NULL AND yearweek=(SELECT MAX(yearweek) FROM site_list4)
				AND treg IS NOT NULL AND TRIM(treg)<>''
				GROUP BY tsel");
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'gangguan-page2' :
			
			$q = $db->query("SELECT gangguan, COUNT(gangguan)AS t FROM site_list4
				WHERE gangguan IS NOT NULL AND yearweek=(SELECT MAX(yearweek) FROM site_list4)
				AND treg IS NOT NULL AND TRIM(treg)<>''
				GROUP BY gangguan");
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'unspec-page2' :
			
			$q = $db->query("SELECT a.unspec_quality, b.assetnum FROM
				(SELECT site_id, unspec_quality FROM site_list4
				WHERE unspec_quality IS NOT NULL AND yearweek=(SELECT MAX(yearweek) FROM site_list4)
				AND treg IS NOT NULL AND TRIM(treg)<>'')a
				LEFT JOIN
				(SELECT assetnum FROM cnq.nossa_telkomsel WHERE TROUBLE_HEADLINE like '%TSEL_CNQ%')b
				ON a.site_id=b.assetnum");
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'detail-issue-city-page3' :
			
			$q = "SELECT a1.treg, a1.kabupaten, COUNT(a1.capacity)AS cap, COUNT(a1.isr)AS isr,
				COUNT(a1.gangguan)AS gang, COUNT(a1.tsel)AS tsel, COUNT(a1.unspec_quality)AS unspec
				FROM (SELECT a.treg, a.kabupaten, b.*
				FROM (SELECT site_id, treg, kabupaten FROM site_list4
				WHERE yearweek=(SELECT MAX(yearweek) FROM site_list4)) a
				INNER JOIN
				(SELECT yearweek, site_id, capacity, isr, gangguan, tsel, unspec_quality
				FROM site_list4 WHERE yearweek=(SELECT MAX(yearweek) FROM site_list4))b
				ON a.site_id=b.site_id)a1
				GROUP BY treg, kabupaten";
			
			$q = $db->query($q);
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'ticket-longest' :
			
			$q = $db->query("SELECT TICKETID, TK_REGION, WITEL, TTR_CUSTOMER_JAM FROM
				cnq.nossa_telkomsel
				WHERE TROUBLE_HEADLINE like '%TSEL_CNQ%' AND STATUS<>'CLOSED'
				AND DATE_FORMAT(CREATIONDATE, '%Y-%m')>DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 12 MONTH), '%Y-%m')
				ORDER BY TTR_CUSTOMER_JAM DESC LIMIT 10");
			
			$a = [];
			while($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'rca-page3' :
			
			$q = "SELECT product, rca, COUNT(*)AS t FROM site_list4
				WHERE rca IS NOT NULL AND yearweek=(SELECT MAX(yearweek) FROM site_list4)
				GROUP BY product, rca";
			
			$q = $db->query($q);
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'rfo-page3' :
			
			$q = "SELECT product, grouping_rfo, COUNT(*)AS t FROM site_list4
				WHERE grouping_rfo IS NOT NULL AND yearweek=(SELECT MAX(yearweek) FROM site_list4)
				GROUP BY product, grouping_rfo";
			
			$q = $db->query($q);
			
			$a = [];
			while ($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'logbook-ticket-quality' :
			
			$q = $db->query("SELECT a1.*, a.RCA, a.updated_treg, a.detail_treg, a.updated_witel,
				a.detail_witel, a.status_rfo, a.grouping_rfo, a.detail_rfo, a.last_update FROM
				(SELECT c.*, b.* FROM (SELECT reportdate, ticketid, trouble_headline, assetnum, status,
				last_worklog, ttr_customer_jam AS ttr FROM cnq.nossa_telkomsel WHERE TROUBLE_HEADLINE like '%TSEL_CNQ%')b
				INNER JOIN (SELECT yearweek, site_id, product, treg, witel FROM site_list4
				WHERE yearweek=(SELECT MAX(yearweek) FROM site_list4))c
				ON b.assetnum=c.site_id)a1
				LEFT JOIN (SELECT * FROM site_ticket WHERE yearweek=(SELECT MAX(yearweek) FROM site_ticket))a
				ON a1.reportdate=a.reportdate AND a1.ticketid=a.ticketid AND a1.yearweek=a.yearweek AND a1.site_id=a.site_id");
			/*
			$q = $db->query("SELECT a1.*, a.RCA, a.updated_treg, a.detail_treg, a.updated_witel,
				a.detail_witel, a.status_rfo, a.grouping_rfo, a.detail_rfo, a.last_update FROM
				(SELECT c.*, b.* FROM (SELECT reportdate, ticketid, trouble_headline, status,
				last_worklog, ttr_customer_jam AS ttr FROM cnq.nossa_telkomsel WHERE TROUBLE_HEADLINE like '%TSEL_CNQ%' AND
				DATE_FORMAT(reportdate, '%Y-%m-%d')>=(SELECT MAX(date) FROM twamp_telkomsel))b
				INNER JOIN (SELECT yearweek, site_id, product, treg, witel FROM site_list4
				WHERE yearweek=(SELECT MAX(yearweek) FROM site_list4))c
				ON SUBSTR(b.trouble_headline, LOCATE('_', b.trouble_headline, 10)+1, 6)=c.site_id)a1
				LEFT JOIN (SELECT * FROM site_ticket WHERE yearweek=(SELECT MAX(yearweek) FROM site_ticket))a
				ON a1.reportdate=a.reportdate AND a1.ticketid=a.ticketid AND a1.yearweek=a.yearweek AND a1.site_id=a.site_id");
			*/
			$a = [];
			while($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'logbook-ticket-close' :
			
			$q = $db->query("SELECT a1.*, a.RCA, a.updated_treg, a.detail_treg, a.updated_witel,
				a.detail_witel, a.status_rfo, a.grouping_rfo, a.detail_rfo, a.last_update FROM
				(SELECT c.*, b.* FROM (SELECT reportdate, ticketid, trouble_headline, assetnum, status,
				last_worklog, ttr_customer_jam AS ttr FROM cnq.nossa_telkomsel WHERE TROUBLE_HEADLINE like '%TSEL_CNQ%'
				AND status='CLOSED')b
				INNER JOIN (SELECT yearweek, site_id, product, treg, witel FROM site_list4
				WHERE yearweek=(SELECT MAX(yearweek) FROM site_list4))c
				ON b.assetnum=c.site_id)a1
				LEFT JOIN (SELECT * FROM site_ticket WHERE yearweek=(SELECT MAX(yearweek) FROM site_ticket))a
				ON a1.reportdate=a.reportdate AND a1.ticketid=a.ticketid AND a1.yearweek=a.yearweek AND a1.site_id=a.site_id");
			/*
			$q = $db->query("SELECT a.*, b.*
				FROM (SELECT reportdate, ticketid, assetnum, trouble_headline, status, last_worklog FROM cnq.nossa_telkomsel 
				WHERE status='CLOSED' AND DATE_FORMAT(reportdate, '%Y-%m-%d')>=(SELECT MAX(date) FROM twamp_telkomsel))a INNER JOIN
				(SELECT * FROM site_list4 WHERE yearweek=(SELECT MAX(yearweek) FROM site_list4)) b
				ON a.assetnum=b.site_id");
			*/
			$a = [];
			while($b = $q->fetch_assoc()) { $a[] = $b; }
			$q->free_result();
			$db->close();
			
			echo json_encode(['status' => 200, 'data' => $a]);
			
		break;
		
		case 'login' :
			
			if (!isset($dt->user) || $dt->user == '' ) {
				echo json_encode(['status' => 400, 'data' => 'error']);
			} else if (!isset($dt->password) || $dt->password == '' ) {
				echo json_encode(['status' => 400, 'data' => 'error']);
			} else {
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL,"https://gis-auth.udata.id/telkom");
				curl_setopt($ch, CURLOPT_POST, 1);
				curl_setopt($ch, CURLOPT_POSTFIELDS, "key=inputyoukey&user=".$dt->user."&password=".$dt->password);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				echo curl_exec($ch);
			}
			
		break;
		
		case 'update-logbook' :
			
			if (!isset($_POST['sql'])) {
				echo json_encode(['status' => 400, 'msg' => 'sql not set!' ]);
			} else {
				
				if ($db->query($_POST['sql']) === TRUE) {
					echo json_encode(['status' => 200, 'msg' => 'logbook-updated']);
				} else {
					echo json_encode(['status' => 400, 'msg' => 'Error: ' . $db->error ]);
				}
				$db->close();
				
			}
			
		break;
		
		case 'insert' :
			
			if (!isset($_POST['sql'])) {
				echo json_encode(['status' => 400, 'msg' => 'sql not set!' ]);
			} else {
				
				if ($db->query($_POST['sql']) === TRUE) {
					echo json_encode(['status' => 200, 'msg' => 'New record created successfully']);
				} else {
					echo json_encode(['status' => 400, 'msg' => 'Error: ' . $db->error ]);
				}
				$db->close();
				
			}
			
		break;
		
		case 'cx-lat-avail' :
			
			$q = $db->query("SELECT DISTINCT yearweek FROM benchmark_latency_kabupaten
				ORDER BY yearweek DESC LIMIT 60");
			
			$a = [];
			while($b = $q->fetch_row()) { $a[] = $b[0]; }
			$q->free_result();
			
			echo json_encode(['status' => 200, 'msg' => $a ]);
			
			$db->close();
			
		break;
		
		case 'cx-pl-avail' :
			
			$q = $db->query("SELECT DISTINCT yearweek FROM benchmark_packetloss_kabupaten
				ORDER BY yearweek DESC LIMIT 60");
			
			$a = [];
			while($b = $q->fetch_row()) { $a[] = $b[0]; }
			$q->free_result();
			
			echo json_encode(['status' => 200, 'msg' => $a ]);
			
			$db->close();
			
		break;
		
		default:
			echo json_encode(['status' => 400, 'msg' => 'unknown cmd ' . $_POST['cmd']]);
		break;
	}
	
} else {
	echo json_encode(['status' => 400, 'msg' => 'Bad Request']);
}
?>