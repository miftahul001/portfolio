<?php namespace App\Models;
 
use CodeIgniter\Model;
 
class Tutela extends Model
{
    protected $table = 'abc';
	protected $table_benchmark_area = 'abc';
	protected $table_benchmark_treg = 'abc';
	protected $table_benchmark_region = 'abc';
	protected $table_benchmark_kabupaten = 'abc';
	protected $table_benchmark_kecamatan = 'abc';
	protected $table_benchmark_desa = 'abc';
	protected $table_benchmark_witel = 'abc';
	protected $table_hourly_area = 'abc';
	protected $table_hourly_treg = 'abc';
	protected $table_hourly_region = 'abc';
	protected $table_hourly_kabupaten = 'abc';
	protected $table_hourly_kecamatan = 'abc';
	protected $table_hourly_desa = 'abc';
	protected $table_hourly_witel = 'abc';
	protected $dashboard = 'dashboard';
	protected $table_twamp_telkomsel = 'abc';
	protected $table_sla_core2internet = 'abc';
	protected $table_brix_exfo = 'abc';
	protected $table_brix_hostname = 'abc';
	
    /**
     *  $returnType as entity class  in RESTful API might not work in CodeIgniter 4.0.2.
     *  You can define as "object" at CodeIgniter 4.0.2 for RESTful API usage.
     *
     *       protected $returnType      = 'object';
     *
     */
	
	public function region_clean($reg) {
		switch ($reg) {
			case "AREA 1" : $ret = "AREA1"; break;
			case "AREA 2" : $ret = "AREA2"; break;
			case "AREA 3" : $ret = "AREA3"; break;
			case "AREA 4" : $ret = "AREA4"; break;	
			case "AREA I" : $ret = "AREA1"; break;
			case "AREA II" : $ret = "AREA2"; break;
			case "AREA III" : $ret = "AREA3"; break;
			case "AREA IV" : $ret = "AREA4"; break;	
			default :
				$ret = $reg;
		}
		
		return $ret;
	}
	
	public function popupv2($type, $field, $value, $tgl, $jam) {
		$dt=[];
		switch (strtoupper($type)) {
			case "PROFILE" :
				$query = "SELECT COUNT(IF(TRANSPORT_TYPE2='IP METRO-E',1,NULL))AS fo, COUNT(IF(TRANSPORT_TYPE2='IP RADIO',1,NULL)) AS radio, COUNT(*)AS t
				FROM mapping_geografis_site
				WHERE TRANSPORT_OWNER='TELKOM' AND $field='$value'";
				$dt["profile"] = $this->db->query($query)->getResultArray();
				break;
			case "PETRANSIT" :
				$query="SELECT SUBSTRING_INDEX(data_brix,'-TRANSIT to ',1)AS a, SUBSTRING(SUBSTRING_INDEX(data_brix,'-TRANSIT to',-1),2)AS b
				FROM brix_hostname WHERE data_brix like '%TRANSIT to %' AND $field='$value' ORDER BY b;";
				$dt["petransit"] = $this->db->query($query)->getResultArray();
				break;
			case "ACCESS" :
				$query = "SELECT a.date, COUNT(IF(a.PL_STATUS='CLEAR',1,NULL))AS pl, COUNT(IF(a.LAT_STAT_REV='CLEAR',1,NULL))AS lat, COUNT(*)AS total
				FROM twamp_telkomsel a
				INNER JOIN (SELECT DISTINCT SITE_ID FROM mapping_geografis_site WHERE $field='$value') b
				ON a.SITE_ID=b.SITE_ID COLLATE utf8mb4_general_ci AND a.TRANSPORT_OWNER='TELKOM' AND a.date=(SELECT MAX(date) FROM twamp_telkomsel WHERE date<='$tgl')
				GROUP BY a.date";
				$dt["akses"] = $this->db->query($query)->getResultArray();
				break;
			case "CORE" :
				$query = "SELECT COUNT(IF(a.plavg < c.threshold_packet_loss, 1,NULL)) AS pl, COUNT(IF(a.latavg < IF(a.vid='PNK', c.threshold_latency_manado,c.threshold_latency_batam), 1,NULL)) AS lat, COUNT(*)as total
				FROM (((SELECT host_name, SUBSTRING(verifier_id,7,3)AS vid, AVG(percent_lost_packets)as plavg, AVG(end_to_end_delay_avg/1000)as latavg
				FROM brix_exfo_mart WHERE tipe='ebr' AND DATE_FORMAT(timestamp, '%Y-%m-%d %H')=(select MAX(DATE_FORMAT(timestamp, '%Y-%m-%d %H'))AS tgl from brix_exfo_mart where DATE_FORMAT(timestamp, '%Y-%m-%d %H')<='$tgl $jam')
				GROUP BY host_name, vid)a
				INNER JOIN (SELECT DISTINCT ipoam, region_tsel FROM brix_hostname WHERE $field='$value')b
				ON a.host_name=b.ipoam)
				INNER JOIN sla_core2internet c ON b.region_tsel=c.region_tsel)";
				
				$query = "SELECT
				COUNT(IF(a.plavg < b.threshold_packet_loss, 1,NULL)) AS pl,
				COUNT(IF(a.latavg < IF(a.vid='PNK', b.threshold_latency_manado,b.threshold_latency_batam), 1,NULL)) AS lat,
				COUNT(*)as total
				FROM (SELECT region, SUBSTRING(verifier_id,7,3)AS vid, AVG(packet_loss)as plavg, AVG(latency)as latavg
				FROM CTI_mart WHERE timestamp=(select MAX(timestamp) from CTI_mart where DATE_FORMAT(timestamp, '%Y-%m-%d %H')<='$tgl $jam')
				GROUP BY region,vid)a
				INNER JOIN sla_core2internet b ON a.region=b.region_tsel COLLATE utf8mb4_general_ci AND a.$field='$value';";
				$dt["core"] = $this->db->query($query)->getResultArray();
				break;
			case "PMETRO" :
				$query = "SELECT DISTINCT metro FROM mapping_geografis_site WHERE metro<>'NULL' AND $field='$value'";
				$dt["pmetro"] = $this->db->query($query)->getResultArray();
				break;
			case "PGPON" :
				$query = "SELECT DISTINCT gpon FROM mapping_geografis_site WHERE gpon<>'NULL' AND $field='$value'";
				$dt["pgpon"] = $this->db->query($query)->getResultArray();
				break;
			case "HEALTHY_FO_RADIO" :
				$query="SELECT COUNT(IF(b.TRANSPORT_TYPE='Metro-E',1,NULL))AS fo, COUNT(IF(b.TRANSPORT_TYPE='IP MW',1,NULL))AS radio
				FROM (twamp_telkomsel b INNER JOIN nossa_telkomsel a
				ON a.ASSETNUM = b.site_id COLLATE utf8mb4_general_ci AND a.STATUS<>'CLOSED' AND DATE_FORMAT(b.date, '%Y-%m-%d %H')=(SELECT MAX(date) FROM twamp_telkomsel WHERE date<='$tgl'))
				INNER JOIN (SELECT DISTINCT SITE_ID FROM mapping_geografis_site WHERE $field='$value')c ON a.ASSETNUM=c.SITE_ID";
				$dt["tRadioFo"] = $this->db->query($query)->getResultArray();
				break;
			case "HEALTHY_IPBB_TBB" :
				$query = "SELECT
				COUNT(IF(a.TK_SYMPTOMS LIKE '%TERA/CORE%',1,NULL))AS ipbb,
				COUNT(IF(a.TK_SYMPTOMS LIKE '%BACKBONE%',1,NULL))AS tbb
				FROM nossa_telkomsel a
				INNER JOIN (SELECT DISTINCT WITEL FROM mapping_geografis_site WHERE $field='$value')b
				ON a.WITEL=b.WITEL AND a.STATUS<>'CLOSED'";
				$dt["IPbbTbb"] = $this->db->query($query)->getResultArray();
				break;
			case "HEALTHY_METRO" :
				$query = "SELECT COUNT(*)AS metro
				FROM utilisasi_metro a
				INNER JOIN (SELECT DISTINCT METRO FROM mapping_geografis_site WHERE $field='$value') b
				ON a.Node=b.METRO AND a.Category='>80'";
				$dt["metro"] = $this->db->query($query)->getResultArray();
				break;
			case "RED_TRANSPORT" :
				$query = "SELECT b.$field, COUNT(IF(a.FINAL_STATUS='OPEN',1,NULL))AS a, COUNT(IF(a.FINAL_STATUS='CLOSED',1,NULL))AS b
				FROM red_transport a
				INNER JOIN mapping_geografis_site b
				ON a.SITE_NAME=b.SITE_NAME COLLATE utf8mb4_general_ci AND a.date=(SELECT MAX(date) FROM red_transport WHERE DATE_FORMAT(date, '%Y-%m-%d %H')<='$tgl $jam') AND $field='$value'
				GROUP BY $field";
				$dt["red_transport"] = $this->db->query($query)->getResultArray();
				break;
			case "CX" :
				$query = "SELECT operator,
						ROUND(AVG(avg_latency),2) AS lat,
						ROUND(AVG(avg_packetloss),2) AS pl,
						ROUND(AVG(game_parameter),2) AS gp,
						ROUND(AVG(avg_signalstrength),2) AS ss
				FROM tutela_hourly_".($field=="location"?"witel ":strtolower($field)."_mart ").
				"WHERE $field='$value' AND date='$tgl' AND hour=$jam
				GROUP BY operator, $field";
				$dt["cx"] = $this->db->query($query)->getResultArray();
				
				$child = ["AREA"=>"treg", "TREG"=>"region", "REGION"=>"kabupaten", "KABUPATEN"=>"kecamatan", "KECAMATAN"=>"desa"];
				$val = strtoupper($field);
				if (array_key_exists($val,$child)) {
					$child = $child[$val];
					$query = "SELECT ROUND((100*a.a)/a.b,0)AS s FROM
					(SELECT COUNT(IF(signal_strength_classification='excelent',1,NULL))AS a, COUNT(signal_strength_classification)AS b
					FROM tutela_hourly_".$child."_mart
					WHERE operator='Telkomsel' AND date='$tgl' AND hour=$jam AND $field='$value')a";
					$dt["cxs"] = $this->db->query($query)->getResultArray();
					
					//$jam=$jam<10?'0'.$jam:$jam;
					$query = "SELECT ROUND(100*a.l/a.b)AS l, ROUND(100*a.p/a.b)AS p, ROUND(100*a.g/a.b)AS g FROM
					(SELECT COUNT(IF(benchmark_latency='win',1,NULL))AS l, COUNT(IF(benchmark_packetloss='win',1,NULL))AS p, COUNT(IF(benchmark_gp='win',1,NULL))AS g, COUNT(*)AS b
					FROM tutela_benchmark_latency_mobile_hourly_".$child."_mart
					WHERE DATE_FORMAT(datetime, '%Y-%m-%d %H')='$tgl $jam' AND $field='$value')a";
					$dt["cxlpg"] = $this->db->query($query)->getResultArray();
				} else {
					$dt["cxs"] = 0;
					$dt["cxlpg"] = 0;
				}
				break;
			case "HANDSET" :
				$query = "SELECT SUM(handset_high_num)AS hi, SUM(handset_mid_num)AS md, SUM(handset_low_num)AS lo
				FROM tutela
				WHERE DATE_FORMAT(timestamp, '%Y-%m-%d %H')=(SELECT MAX(DATE_FORMAT(timestamp, '%Y-%m-%d %H')) FROM tutela where DATE_FORMAT(timestamp, '%Y-%m-%d %H')<='$tgl $jam' AND $field='$value') AND $field='$value'";
				$dt["handsetcx"] = $this->db->query($query)->getResultArray();	
				break;
			case "TABEL4G" :
				//LAT PL 4G
				$query = "SELECT a.date AS tgl, ROUND(AVG(a.avg_packet_loss),2) AS pl, ROUND(AVG(a.latency),2) AS lat, c.threshold_packet_loss, c.threshold_latency
				FROM (((twamp_telkomsel a INNER JOIN (SELECT DISTINCT SITE_ID FROM mapping_geografis_site WHERE $field='$value')b
				ON a.SITE_ID = b.SITE_ID COLLATE utf8mb4_general_ci AND a.transport_owner='TELKOM' AND a.date=(SELECT MAX(date) FROM twamp_telkomsel WHERE date<='$tgl')))
				INNER JOIN sla_4g c ON a.region=c.region_tsel AND a.city_cluster=c.city_cluster AND c.year=(SELECT MAX(year) FROM sla_4g))
				GROUP BY tgl, threshold_packet_loss, threshold_latency ORDER BY tgl DESC LIMIT 1";
				
				$query = "SELECT a.date AS tgl, ROUND(AVG(a.packet_loss),2) AS pl, ROUND(AVG(a.latency),2) AS lat,
				b.threshold_packet_loss, b.threshold_latency
				FROM 4g_mart a INNER JOIN sla_4g b ON a.region=SUBSTRING(b.region_tsel,4) COLLATE utf8mb4_general_ci
				AND b.year=(SELECT MAX(year) FROM sla_4g) AND a.$field='$value'
				AND a.date=(SELECT MAX(date) FROM 4g_mart WHERE date<='$tgl')
				GROUP BY tgl, threshold_packet_loss, threshold_latency ORDER BY tgl DESC LIMIT 1";
				$dt["latpl4G"] = $this->db->query($query)->getResultArray();
				break;
			case "TABELCTI" :
				$query = "SELECT DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')AS tgl, IF(SUBSTRING(a.verifier_id,7,3)='PNK','PNK','BTM')AS vid, ROUND(AVG(a.end_to_end_delay_avg/1000),2)AS lat, c.threshold_latency_manado AS PNK, c.threshold_latency_batam AS BTM
				FROM brix_exfo_mart a, brix_hostname b, sla_core2internet c
				WHERE a.tipe='ebr' AND c.year=(SELECT MAX(year)FROM sla_core2internet) AND a.host_name=b.ipoam AND b.region_tsel=c.region_tsel AND b.$field='$value' AND (DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')<='$tgl $jam' OR DATE_FORMAT(a.timestamp, '%Y-%m-%d %H:00:00')='$tgl $jam:00:00' - INTERVAL 7 DAY)
				GROUP BY tgl, vid, PNK, BTM
				ORDER BY tgl DESC LIMIT 4";
				
				$query = "(SELECT DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')AS tgl,
				IF(SUBSTRING(a.verifier_id,7,3)='PNK','PNK','BTM')AS vid,
				ROUND(AVG(a.latency),2)AS lat,
				b.threshold_latency_manado AS PNK, b.threshold_latency_batam AS BTM
				FROM CTI_mart a INNER JOIN sla_core2internet b
				ON a.region=b.region_tsel COLLATE utf8mb4_general_ci AND b.year=(SELECT MAX(year)FROM sla_core2internet) AND a.$field='$value'
				AND a.timestamp=(SELECT MAX(timestamp)FROM CTI_mart WHERE DATE_FORMAT(timestamp, '%Y-%m-%d %H')<='$tgl $jam')
				GROUP BY tgl, vid, PNK, BTM
				ORDER BY tgl DESC LIMIT 2)
				UNION
				(SELECT DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')AS tgl,
				IF(SUBSTRING(a.verifier_id,7,3)='PNK','PNK','BTM')AS vid,
				ROUND(AVG(a.latency),2)AS lat,
				b.threshold_latency_manado AS PNK, b.threshold_latency_batam AS BTM
				FROM CTI_mart a INNER JOIN sla_core2internet b
				ON a.region=b.region_tsel COLLATE utf8mb4_general_ci AND b.year=(SELECT MAX(year)FROM sla_core2internet) AND a.$field='$value'
				AND a.timestamp=(SELECT MAX(timestamp) FROM CTI_mart WHERE timestamp<=(SELECT (MAX(timestamp) - INTERVAL 7 DAY)AS tgl FROM CTI_mart WHERE DATE_FORMAT(timestamp, '%Y-%m-%d %H')<='$tgl $jam'))
				GROUP BY tgl, vid, PNK, BTM
				ORDER BY tgl DESC LIMIT 2)";
				$dt["latctipnkbtm"] = $this->db->query($query)->getResultArray();
				
				//PL CTI
				$query = "SELECT DATE_FORMAT(a.timestamp, '%Y-%m-%d')AS tgl, ROUND(AVG(a.percent_lost_packets),2) AS pl, c.threshold_packet_loss AS threshold
				FROM ((brix_exfo_mart a INNER JOIN brix_hostname b
				ON a.tipe='ebr'  AND (DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')='$tgl $jam' OR DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')<='$tgl $jam:00:00' - INTERVAL 7 DAY) AND a.host_name=b.ipoam AND $field='$value')
				INNER JOIN sla_core2internet c
				ON c.year=(SELECT MAX(year)FROM sla_core2internet) AND b.region_tsel=c.region_tsel)
				GROUP BY tgl, threshold
				ORDER BY tgl DESC LIMIT 2";
				
				$query = "(SELECT DATE_FORMAT(a.timestamp, '%Y-%m-%d')AS tgl, ROUND(AVG(a.packet_loss),2) AS pl, b.threshold_packet_loss AS threshold
				FROM CTI_mart a INNER JOIN sla_core2internet b
				ON a.region=b.region_tsel COLLATE utf8mb4_general_ci AND b.year=(SELECT MAX(year)FROM sla_core2internet) AND a.$field='$value'
				AND a.timestamp=(SELECT MAX(timestamp)FROM CTI_mart WHERE DATE_FORMAT(timestamp, '%Y-%m-%d %H')<='$tgl $jam')
				GROUP BY tgl, threshold
				ORDER BY tgl DESC LIMIT 1)
				UNION
				(SELECT DATE_FORMAT(a.timestamp, '%Y-%m-%d')AS tgl, ROUND(AVG(a.packet_loss),2) AS pl, b.threshold_packet_loss AS threshold
				FROM CTI_mart a INNER JOIN sla_core2internet b
				ON a.region=b.region_tsel COLLATE utf8mb4_general_ci AND b.year=(SELECT MAX(year)FROM sla_core2internet) AND a.$field='$value'
				AND a.timestamp=(SELECT MAX(timestamp) FROM CTI_mart WHERE timestamp<=(SELECT (MAX(timestamp) - INTERVAL 7 DAY)AS tgl FROM CTI_mart WHERE DATE_FORMAT(timestamp, '%Y-%m-%d %H')<='$tgl $jam'))
				GROUP BY tgl, threshold
				ORDER BY tgl DESC LIMIT 1)";
				$dt["plcti"] = $this->db->query($query)->getResultArray();
				
				break;
			case "TABELCX" :
				$query = "SELECT date, ROUND(avg_latency,2)AS lat, ROUND(avg_packetloss,2)AS pl
				FROM tutela_hourly_".$field."_mart
				WHERE operator='Telkomsel' AND $field='$value' AND hour=$jam AND (date='$tgl' OR date=DATE_FORMAT('$tgl $jam:00:00' - INTERVAL 7 DAY, '%Y-%m-%d'))";
				$dt["latplcx"] = $this->db->query($query)->getResultArray();
				break;
			case "CHARTCX" :
				$query = "SELECT CONCAT(date, IF(hour<10,' 0',' '), hour) AS tgl, ROUND(AVG(avg_latency),2)AS lat, ROUND(AVG(avg_packetloss),2)AS pl
				FROM tutela_hourly_".$field."_mart WHERE operator='Telkomsel' AND CONCAT(date, IF(hour<10,' 0',' '), hour)<='$tgl $jam' AND $field='$value'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 24";
				$query = "SELECT CONCAT(date, IF(hour<10,' 0',' '), hour) AS tgl, ROUND(avg_latency,2)AS lat, ROUND(avg_packetloss,2)AS pl
				FROM tutela_hourly_".$field."_mart WHERE operator='Telkomsel' AND CONCAT(date, IF(hour<10,' 0',' '), hour)<='$tgl $jam' AND $field='$value'
				ORDER BY tgl DESC LIMIT 24";
				$dt["CXhourly"] = $this->db->query($query)->getResultArray();
				
				$query = "SELECT date AS tgl, ROUND(AVG(avg_latency),2)AS lat, ROUND(AVG(avg_packetloss),2)AS pl
				FROM tutela_hourly_".$field."_mart WHERE date<='$tgl' AND $field='$value' GROUP BY date ORDER BY date DESC LIMIT 90";
				$dt["CXdaily"] = $this->db->query($query)->getResultArray();
				break;
			case "CHART4G" :
				$query = "SELECT a.date AS tgl, ROUND(AVG(a.avg_packet_loss),2)AS pl, ROUND(AVG(a.latency),2)AS lat
				FROM twamp_telkomsel a INNER JOIN (SELECT DISTINCT SITE_ID FROM mapping_geografis_site WHERE $field='$value')b
				ON a.SITE_ID=b.SITE_ID COLLATE utf8mb4_general_ci AND a.transport_owner='TELKOM' AND a.date<='$tgl'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 90";
				
				$query = "SELECT date AS tgl, ROUND(AVG(PACKET_LOSS),2)AS pl, ROUND(AVG(latency),2)AS lat
				FROM 4g_mart WHERE $field='$value' AND date<='$tgl'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 90";
				$dt["Chart4G"] = $this->db->query($query)->getResultArray();
				break;
			case "CHARTCTILATBTMH" :
				$query="SELECT DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')AS tgl, ROUND(AVG(a.end_to_end_delay_avg/1000),2)AS lat
				FROM brix_exfo_mart a INNER JOIN brix_hostname b ON a.tipe='ebr' AND SUBSTRING(a.verifier_id,7,3)<>'PNK'
				AND a.host_name=b.ipoam AND b.$field='$value' AND DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')<='$tgl $jam'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 24";
				$dt["CTIlatbh"] = $this->db->query($query)->getResultArray();
				break;
			case "CHARTCTILATPNKH" :
				$query="SELECT DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')AS tgl, ROUND(AVG(a.end_to_end_delay_avg/1000),2)AS lat
				FROM brix_exfo_mart a INNER JOIN brix_hostname b ON a.tipe='ebr' AND SUBSTRING(a.verifier_id,7,3)='PNK'
				AND a.host_name=b.ipoam AND b.$field='$value' AND DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')<='$tgl $jam'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 24";
				$dt["CTIlatph"] = $this->db->query($query)->getResultArray();
				break;
			case "CHARTCTILATBTMD" :
				$query="SELECT DATE(a.timestamp)AS tgl, ROUND(AVG(a.end_to_end_delay_avg/1000),2)AS lat
				FROM brix_exfo_mart a INNER JOIN brix_hostname b
				ON a.tipe='ebr' AND SUBSTRING(a.verifier_id,7,3)<>'PNK' AND a.host_name=b.ipoam AND b.$field='$value' AND DATE(a.timestamp)<='$tgl'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 90";
				$dt["CTIlatbd"] = $this->db->query($query)->getResultArray();
				break;
			case "CHARTCTILATPNKD" :
				$query="SELECT DATE(a.timestamp)AS tgl, ROUND(AVG(a.end_to_end_delay_avg/1000),2)AS lat
				FROM brix_exfo_mart a INNER JOIN brix_hostname b
				ON a.tipe='ebr' AND SUBSTRING(a.verifier_id,7,3)='PNK' AND a.host_name=b.ipoam AND b.$field='$value' AND DATE(a.timestamp)<='$tgl'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 90";
				$dt["CTIlatpd"] = $this->db->query($query)->getResultArray();
				break;
			case "CHARTCTIPLH" :
				$query="SELECT DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')AS tgl, ROUND(AVG(percent_lost_packets),2)AS pl
				FROM brix_exfo_mart a INNER JOIN brix_hostname b
				WHERE a.tipe='ebr' AND a.host_name=b.ipoam AND b.$field='$value' AND DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')<='$tgl $jam'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 24";
				$dt["CTIplh"] = $this->db->query($query)->getResultArray();
				break;
			case "CHARTCTIPLD" :
				$query="SELECT DATE(a.timestamp)AS tgl, ROUND(AVG(percent_lost_packets),2)AS pl
				FROM brix_exfo_mart a INNER JOIN brix_hostname b
				WHERE a.tipe='ebr' AND a.host_name=b.ipoam AND b.$field='$value' AND DATE(a.timestamp)<='$tgl'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 90";
				$dt["CTIpld"] = $this->db->query($query)->getResultArray();
				break;
			case "CHARTCTI" :
				//CTI LAT hourly
				$query="SELECT DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')AS tgl, ROUND(AVG(a.end_to_end_delay_avg/1000),2)AS lat
				FROM brix_exfo_mart a INNER JOIN brix_hostname b ON a.tipe='ebr' AND SUBSTRING(a.verifier_id,7,3)<>'PNK'
				AND a.host_name=b.ipoam AND b.$field='$value' AND DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')<='$tgl $jam'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 24";
				
				$query="SELECT DATE_FORMAT(timestamp, '%Y-%m-%d %H')AS tgl, ROUND(AVG(latency),2)AS lat
				FROM CTI_mart WHERE SUBSTRING(verifier_id,7,3)<>'PNK'
				AND DATE_FORMAT(timestamp, '%Y-%m-%d %H')<='$tgl $jam' AND $field='$value'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 24";
				$dt["CTIlatbh"] = $this->db->query($query)->getResultArray();
				
				$query="SELECT DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')AS tgl, ROUND(AVG(a.end_to_end_delay_avg/1000),2)AS lat
				FROM brix_exfo_mart a INNER JOIN brix_hostname b ON a.tipe='ebr' AND SUBSTRING(a.verifier_id,7,3)='PNK'
				AND a.host_name=b.ipoam AND b.$field='$value' AND DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')<='$tgl $jam'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 24";
				
				$query="SELECT DATE_FORMAT(timestamp, '%Y-%m-%d %H')AS tgl, ROUND(AVG(latency),2)AS lat
				FROM CTI_mart WHERE SUBSTRING(verifier_id,7,3)='PNK'
				AND DATE_FORMAT(timestamp, '%Y-%m-%d %H')<='$tgl $jam' AND $field='$value'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 24";
				$dt["CTIlatph"] = $this->db->query($query)->getResultArray();
				
				//CTI LAT daily
				$query="SELECT DATE(a.timestamp)AS tgl, ROUND(AVG(a.end_to_end_delay_avg/1000),2)AS lat
				FROM brix_exfo_mart a INNER JOIN brix_hostname b
				ON a.tipe='ebr' AND SUBSTRING(a.verifier_id,7,3)<>'PNK' AND a.host_name=b.ipoam AND b.$field='$value' AND DATE(a.timestamp)<='$tgl'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 90";
				
				$query="SELECT DATE_FORMAT(timestamp, '%Y-%m-%d')AS tgl, ROUND(AVG(latency),2)AS lat
				FROM CTI_mart WHERE SUBSTRING(verifier_id,7,3)<>'PNK'
				AND DATE(timestamp)<='$tgl' AND $field='$value'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 90";
				$dt["CTIlatbd"] = $this->db->query($query)->getResultArray();
				
				$query="SELECT DATE(a.timestamp)AS tgl, ROUND(AVG(a.end_to_end_delay_avg/1000),2)AS lat
				FROM brix_exfo_mart a INNER JOIN brix_hostname b
				ON a.tipe='ebr' AND SUBSTRING(a.verifier_id,7,3)='PNK' AND a.host_name=b.ipoam AND b.$field='$value' AND DATE(a.timestamp)<='$tgl'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 90";
				
				$query="SELECT DATE_FORMAT(timestamp, '%Y-%m-%d')AS tgl, ROUND(AVG(latency),2)AS lat
				FROM CTI_mart WHERE SUBSTRING(verifier_id,7,3)='PNK'
				AND DATE(timestamp)<='$tgl' AND $field='$value'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 90";
				$dt["CTIlatpd"] = $this->db->query($query)->getResultArray();
				
				//CTI PL hourly
				$query="SELECT DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')AS tgl, ROUND(AVG(percent_lost_packets),2)AS pl
				FROM brix_exfo_mart a INNER JOIN brix_hostname b
				WHERE a.tipe='ebr' AND a.host_name=b.ipoam AND b.$field='$value' AND DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')<='$tgl $jam'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 24";
				
				$query="SELECT DATE_FORMAT(timestamp, '%Y-%m-%d %H')AS tgl, ROUND(AVG(packet_loss),2)AS pl
				FROM CTI_mart WHERE $field='$value' AND DATE_FORMAT(timestamp, '%Y-%m-%d %H')<='$tgl $jam'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 24";
				$dt["CTIplh"] = $this->db->query($query)->getResultArray();
				
				$query="SELECT DATE(a.timestamp)AS tgl, ROUND(AVG(percent_lost_packets),2)AS pl
				FROM brix_exfo_mart a INNER JOIN brix_hostname b
				WHERE a.tipe='ebr' AND a.host_name=b.ipoam AND b.$field='$value' AND DATE(a.timestamp)<='$tgl'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 90";
				
				$query="SELECT DATE(timestamp)AS tgl, ROUND(AVG(packet_loss),2)AS pl
				FROM CTI_mart WHERE $field='$value' AND DATE(timestamp)<='$tgl'
				GROUP BY tgl ORDER BY tgl DESC LIMIT 90";
				$dt["CTIpld"] = $this->db->query($query)->getResultArray();
				break;
			case "TESTING" :
				$query = "SELECT DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')AS tgl, IF(SUBSTRING(a.verifier_id,7,3)='PNK','PNK','BTM')AS vid, ROUND(AVG(a.end_to_end_delay_avg/1000),2)AS lat, c.threshold_latency_manado AS PNK, c.threshold_latency_batam AS BTM
				FROM brix_exfo_mart a, brix_hostname b, sla_core2internet c
				WHERE a.tipe='ebr' AND c.year=(SELECT MAX(year)FROM sla_core2internet) AND a.host_name=b.ipoam AND b.region_tsel=c.region_tsel AND b.$field='$value' AND (DATE_FORMAT(a.timestamp, '%Y-%m-%d %H')='$tgl $jam' OR DATE_FORMAT(a.timestamp, '%Y-%m-%d %H:00:00')='$tgl $jam:00:00' - INTERVAL 7 DAY)
				GROUP BY tgl, vid, PNK, BTM
				ORDER BY tgl DESC";
				$dt["testing"] = $query;
				break;
		}
		return $dt;
	}
	
	public function tutela_np1($type, $performance, $field, $value, $tgl, $jam) {
		switch (strtoupper($type)) {
			case "box1":
				$query = "SELECT COUNT(IF(c.cl=0,1,NULL))AS ac, COUNT(c.cl)AS tot
				FROM (SELECT a.$field AS nama, SUM(IF((a.clear/a.c)*100>b.target_achievement_latency,0,1))AS cl
				FROM (SELECT DATE_FORMAT(created_at, '%Y-%m-%d %H')AS tgl, $field2, COUNT(IF(lat_status20='CLEAR',1,NULL))AS clear, COUNT(lat_status20)AS c
				FROM twamp_telkomsel
				WHERE transport_owner='TELKOM' AND DATE_FORMAT(created_at, '%Y-%m-%d %H')='$tgl $jam1' $filter
				GROUP BY tgl,$field2)a,
				(SELECT DISTINCT region_tsel, target_achievement_latency FROM sla_4g WHERE year=$tahun) b
				WHERE a.region=b.region_tsel
				GROUP BY nama)c";
				if ($region<>"treg") $dt["box1"] = $this->db->query($query)->getResultArray();
				break;
			case "kab":
				$filter = " AND region=\"" . $_GET['filter'] . "\"";
				break;
			default:
				$filter = " AND kabupaten=\"" . $_GET['filter'] . "\"";
				break;
		}
		
		$filter = "";
		if (isset($_GET["filter"])) {
			switch ($region) {
				case "region":
					$filter = " AND treg=\"" . $_GET['filter'] . "\"";
					break;
				case "kab":
					$filter = " AND region=\"" . $_GET['filter'] . "\"";
					break;
				default:
					$filter = " AND kabupaten=\"" . $_GET['filter'] . "\"";
					break;
			}
		}
		
		$jam1 = $jam;//($jam<10)?"0$jam":$jam;
		//COLOR
		if ($region=="treg") $field = "b.region_telkom";
		else $field = "b.region_tsel";
		
		if ($region=="region") {
			$field1="region";
			$field2="region";
		} else {
			$field1="kabupaten";
			$field2="region,kabupaten";
		}
		if ($tipe=="ltc-4g") {
				//Warna latency-4g
				if ($region=="kec") {
					$query = "SELECT created_at, site_id AS nama, lat_status20 AS cl
					FROM twamp_telkomsel
					WHERE TRANSPORT_OWNER='TELKOM' AND date=(SELECT MAX(date)FROM twamp_telkomsel WHERE date<='$tgl') $filter
					ORDER BY created_at DESC";
				} else {
					$query = "SELECT a.$field1 AS nama, SUM(IF((a.clear/a.c)*100>b.target_achievement_latency,0,1))AS yn
					FROM (SELECT DATE_FORMAT(created_at, '%Y-%m-%d %H')AS tgl, $field2, COUNT(IF(lat_status20='CLEAR',1,NULL))AS clear, COUNT(lat_status20)AS c
					FROM twamp_telkomsel
					WHERE transport_owner='TELKOM' AND date=(SELECT MAX(date)FROM twamp_telkomsel WHERE date<='$tgl') $filter
					GROUP BY tgl,$field2)a,
					(SELECT DISTINCT region_tsel, target_achievement_latency FROM sla_4g WHERE year=(SELECT MAX(year)FROM sla_4g)) b
					WHERE a.region=b.region_tsel
					GROUP BY nama";
				}
				$dt["color"] = $query;//$this->db->query($query)->getResultArray();
			} else if ($tipe=="pl-4g") {
				//Warna packet loss 4g
				if ($region=="kec") {
					$query = "SELECT created_at, site_id AS nama, pl_status AS cl
					FROM twamp_telkomsel
					WHERE TRANSPORT_OWNER='TELKOM' AND DATE_FORMAT(created_at, '%Y-%m-%d %H')='$tgl $jam1' $filter
					ORDER BY created_at DESC";
				} else {
					$query = "SELECT a.$field1 AS nama, SUM(IF((a.clear/a.c)*100>=b.target_achievement_packet_loss,0,1))AS yn
					FROM (SELECT DATE_FORMAT(created_at, '%Y-%m-%d %H')AS tgl, $field2, city_cluster, COUNT(IF(PL_STATUS='CLEAR',1,NULL))AS clear, COUNT(PL_STATUS)AS c
					FROM twamp_telkomsel
					WHERE transport_owner='TELKOM' AND DATE_FORMAT(created_at, '%Y-%m-%d %H')='$tgl $jam1' $filter
					GROUP BY tgl,$field2,city_cluster)a, 
					(SELECT DISTINCT region_tsel, target_achievement_packet_loss, city_cluster FROM sla_4g WHERE year=$tahun) b
					WHERE a.region=b.region_tsel AND a.city_cluster=b.city_cluster
					GROUP BY nama";
				}
				$dt["color"] = $this->db->query($query)->getResultArray();
		} else {
			switch ($tipe) {
				case "ltc-bds":
					$avg="end_to_end_delay_avg/1000";
					$verifier = "BTC";
					$threshold = "threshold_latency_batam";
					$target_achievement = "target_achievement_latency";
					break;
				case "ltc-btc":
					$avg="end_to_end_delay_avg/1000";
					$verifier = "BDS";
					$threshold = "threshold_latency_batam";
					$target_achievement = "target_achievement_latency";
					break;
				case "ltc-pnk":
					$avg="end_to_end_delay_avg/1000";
					$verifier = "PNK";
					$threshold = "threshold_latency_manado";
					$target_achievement = "target_achievement_latency";
					break;
				case "pl-bds":
					$avg="percent_lost_packets";
					$verifier = "BDS";
					$threshold = "threshold_packet_loss";
					$target_achievement = "target_achievement_packet_loss";
					break;
				case "pl-btc":
					$avg="percent_lost_packets";
					$verifier = "BTC";
					$threshold = "threshold_packet_loss";
					$target_achievement = "target_achievement_packet_loss";
					break;
				case "pl-pnk":
					$avg="percent_lost_packets";
					$verifier = "PNK";
					$threshold = "threshold_packet_loss";
					$target_achievement = "target_achievement_packet_loss";
					break;
				default:
					$avg="end_to_end_delay_avg/1000";
					$verifier = "BTC";
					$threshold = "threshold_latency_batam";
					$target_achievement = "target_achievement_latency";
			}
			
			//$query = "SELECT aa.nama, aa.clear, (aa.total-aa.clear)AS notclear, ROUND((aa.clear/aa.total)*100,0)AS persen, IF((aa.clear/aa.total)*100 > aa.$target_achievement, \"y\", \"n\")AS yn
			$query = "SELECT aa.nama, IF((aa.clear/aa.total)*100 >= aa.$target_achievement, 0,1)AS yn
			FROM (SELECT $field AS nama, c.$target_achievement, COUNT(IF (a.avg < $threshold, 1,NULL)) AS clear, COUNT(*)as total
				FROM (SELECT DATE_FORMAT(timestamp, '%Y-%m-%d %H')AS tgl, host_name, AVG($avg)AS avg
					FROM brix_exfo_mart
					WHERE tipe='ebr' AND SUBSTRING(verifier_id,7,3)='$verifier' AND DATE_FORMAT(timestamp, '%Y-%m-%d %H')='$tgl $jam1'
					GROUP BY host_name, tgl) a,
				brix_hostname b, sla_core2internet c
				WHERE a.host_name=b.ipoam AND b.region_tsel=c.region_tsel AND c.year=$tahun
				GROUP BY $field,c.$target_achievement)aa";
			$query = "SELECT aa.nama, IF((aa.clear/aa.total)*100 >= aa.$target_achievement, 0,1)AS yn
			FROM (SELECT $field AS nama, c.$target_achievement, COUNT(IF (a.avg < c.$threshold, 1,NULL)) AS clear, COUNT(*)as total
				FROM (SELECT DATE_FORMAT(timestamp, '%Y-%m-%d %H')AS tgl, host_name, AVG($avg)AS avg
					FROM brix_exfo_mart
					WHERE tipe='ebr' AND SUBSTRING(verifier_id,7,3)='$verifier' AND DATE_FORMAT(timestamp, '%Y-%m-%d %H')='$tgl $jam1'
					GROUP BY host_name, tgl) a,
				brix_hostname b, (SELECT DISTINCT region_tsel, $threshold, $target_achievement
			FROM sla_core2internet WHERE year=$tahun)c
				WHERE a.host_name=b.ipoam AND b.region_tsel=c.region_tsel
				GROUP BY $field,c.$target_achievement)aa";
			$dt["color"] = $this->db->query($query)->getResultArray();
		}
			$dt["jam"] = $jam;
			$dt["jam1"] = $jam1;
			
			//BOX1
			$query = "SELECT COUNT(IF(c.cl=0,1,NULL))AS ac, COUNT(c.cl)AS tot
			FROM (SELECT a.$field1 AS nama, SUM(IF((a.clear/a.c)*100>b.target_achievement_latency,0,1))AS cl
			FROM (SELECT DATE_FORMAT(created_at, '%Y-%m-%d %H')AS tgl, $field2, COUNT(IF(lat_status20='CLEAR',1,NULL))AS clear, COUNT(lat_status20)AS c
			FROM twamp_telkomsel
			WHERE transport_owner='TELKOM' AND DATE_FORMAT(created_at, '%Y-%m-%d %H')='$tgl $jam1' $filter
			GROUP BY tgl,$field2)a,
			(SELECT DISTINCT region_tsel, target_achievement_latency FROM sla_4g WHERE year=$tahun) b
			WHERE a.region=b.region_tsel
			GROUP BY nama)c";
			if ($region<>"treg") $dt["box1"] = $this->db->query($query)->getResultArray();
			
			//BOX2
			$query = "SELECT COUNT(IF((aa.clear/aa.total)*100>=aa.target,1,NULL))AS clear, COUNT(*)AS tot FROM
			(SELECT $field AS nama, c.target_achievement_latency AS target, a.vid,
			COUNT(IF (a.avg < IF(a.vid='PNK',c.threshold_latency_manado,c.threshold_latency_batam), 1,NULL)) AS clear,
			COUNT(*)as total FROM (SELECT DATE_FORMAT(timestamp, '%Y-%m-%d %H')AS tgl, host_name,
			SUBSTRING(verifier_id,7,3)AS vid, AVG(end_to_end_delay_avg/1000)AS avg FROM brix_exfo_mart WHERE tipe='ebr' AND
			DATE_FORMAT(timestamp, '%Y-%m-%d %H')='$tgl $jam1' GROUP BY tgl, host_name, vid) a, brix_hostname b,
			(SELECT DISTINCT region_tsel, threshold_latency_batam, threshold_latency_manado, target_achievement_latency
			FROM sla_core2internet WHERE year=$tahun)c WHERE a.host_name=b.ipoam AND b.region_tsel=c.region_tsel
			GROUP BY nama, target, vid)aa";
			if ($region=="treg" OR $region=="region") $dt["box2"] = $this->db->query($query)->getResultArray();
			/*
			$query = "SELECT aa.clear, (aa.total-aa.clear)AS notclear, ROUND((aa.clear/aa.total)*100,0)AS persen, IF((aa.clear/aa.total)*100 > aa.target_achievement_latency, \"yes\", \"no\")AS achivement
			FROM (SELECT c.target_achievement_latency, COUNT(IF (a.avg < IF(a.vid=\"PNK\",c.threshold_latency_manado,c.threshold_latency_batam), 1,NULL)) AS clear, COUNT(*)as total
				FROM (SELECT DATE_FORMAT(timestamp, \"%Y-%m-%d %H\")AS tgl, host_name, SUBSTRING(verifier_id,7,3)AS vid, AVG(end_to_end_delay_avg/1000)AS avg
				FROM brix_exfo
				WHERE tipe=\"ebr\" AND DATE_FORMAT(timestamp, \"%Y-%m-%d %H\")=\"$tgl $jam1\"
				GROUP BY host_name, tgl, vid) a,
			brix_hostname b, sla_core2internet c
			WHERE a.host_name=b.ipoam AND b.region_tsel=c.region_tsel
			GROUP BY c.target_achievement_latency)aa";
			$dt["box2"] = $this->db->query($query)->getResultArray();
			*/
			
			//BOX3
			$query = "SELECT DATE_FORMAT(date, \"%Y-%m-%d %H\")AS tgl, COUNT(IF(final_status=\"OPEN\",1,NULL))AS o, COUNT(IF(final_status=\"CLOSED\",1,NULL))AS c
				FROM red_transport
				WHERE UPPER(transport_owner)=\"TELKOM\" AND DATE_FORMAT(created_at, \"%Y-%m-%d %H\")=\"$tgl $jam1\"
				GROUP BY tgl";
			$dt["box3"] = $this->db->query($query)->getResultArray();
		//}
		
		return $dt;
	}
	
	public function tutela_np($region, $tipe, $tgl, $jam) {
		$dt = array("color"=>[], "box1"=>[], "box2"=>[], "box3"=>[], "box4"=>[]);
		$tahun = substr($tgl,0,4);
		
		$filter = "";
		if (isset($_GET["filter"])) {
			switch ($region) {
				case "region":
					$filter = " AND treg=\"" . $_GET['filter'] . "\"";
					break;
				case "kab":
					$filter = " AND region=\"" . $_GET['filter'] . "\"";
					break;
				default:
					$filter = " AND kabupaten=\"" . $_GET['filter'] . "\"";
					break;
			}
		}
		
		$jam1 = $jam;//($jam<10)?"0$jam":$jam;
		//COLOR
		if ($region=="treg") $field = "b.region_telkom";
		else $field = "b.region_tsel";
		
		if ($region=="region") {
			$field1="region";
			$field2="region";
			$field3="reg_name";
		} else {
			$field1="kabupaten";
			$field2="region,kabupaten";
			$field3="kabupaten";
		}
		if ($tipe=="ltc-4g") {
				//Warna latency-4g
				if ($region=="kec") {
					$query = "SELECT date, site_id AS nama, lat_stat_rev AS cl
					FROM twamp_telkomsel
					WHERE TRANSPORT_OWNER='TELKOM' AND date=(SELECT MAX(date)FROM twamp_telkomsel WHERE date<='$tgl') $filter
					ORDER BY date DESC";
				} else {
					/*
					$query = "SELECT a.$field1 AS nama, SUM(IF((a.clear/a.c)*100>b.target_achievement_latency,0,1))AS yn
					FROM (SELECT date AS tgl, $field2, COUNT(IF(lat_stat_rev='CLEAR',1,NULL))AS clear, COUNT(lat_stat_rev)AS c
					FROM twamp_telkomsel
					WHERE transport_owner='TELKOM' AND date=(SELECT MAX(date)FROM twamp_telkomsel WHERE date<='$tgl') $filter
					GROUP BY tgl,$field2)a,
					(SELECT DISTINCT region_tsel, target_achievement_latency FROM sla_4g WHERE year=(SELECT MAX(year)FROM sla_4g)) b
					WHERE a.region=b.region_tsel
					GROUP BY nama";
					*/
					$query = "SELECT a.nama, SUM(IF((a.clear/a.c)*100>b.target_achievement_latency,0,1))AS yn
					FROM (SELECT b.nama, a.region, COUNT(IF(a.lat_stat_rev='CLEAR',1,NULL))AS clear, COUNT(a.lat_stat_rev)AS c
					FROM twamp_telkomsel a INNER JOIN (SELECT DISTINCT SITE_ID, $field3 AS nama FROM mapping_geografis_site)b
					ON a.SITE_ID = b.SITE_ID COLLATE utf8mb4_general_ci AND b.nama<>'NULL' AND a.transport_owner='TELKOM' AND
					a.date=(SELECT MAX(date) FROM twamp_telkomsel WHERE date<='$tgl') GROUP BY nama, region)a
					INNER JOIN  (SELECT DISTINCT region_tsel, target_achievement_latency FROM sla_4g WHERE year=(SELECT MAX(year)FROM sla_4g))b
					ON a.region=b.region_tsel
					GROUP BY a.nama";
				}
				$dt["color"] = $this->db->query($query)->getResultArray();
			} else if ($tipe=="pl-4g") {
				//Warna packet loss 4g
				if ($region=="kec") {
					$query = "SELECT date, site_id AS nama, pl_status AS cl
					FROM twamp_telkomsel
					WHERE TRANSPORT_OWNER='TELKOM' AND date=(SELECT MAX(date)FROM twamp_telkomsel WHERE date<='$tgl') $filter ";
				} else {
					$query = "SELECT a.$field1 AS nama, SUM(IF((a.clear/a.c)*100>=b.target_achievement_packet_loss,0,1))AS yn
					FROM (SELECT $field2, city_cluster, COUNT(IF(PL_STATUS='CLEAR',1,NULL))AS clear, COUNT(PL_STATUS)AS c
					FROM twamp_telkomsel
					WHERE transport_owner='TELKOM' AND date=(SELECT MAX(date)FROM twamp_telkomsel WHERE date<='$tgl') $filter
					GROUP BY $field2,city_cluster)a INNER JOIN
					(SELECT DISTINCT region_tsel, target_achievement_packet_loss, city_cluster FROM sla_4g WHERE year=(SELECT MAX(year)FROM sla_4g)) b
					ON a.region=b.region_tsel AND a.city_cluster=b.city_cluster AND a.$field1<>'NULL' AND a.$field1 IS NOT NULL
					GROUP BY nama";
				}
				$dt["color"] = $this->db->query($query)->getResultArray();
		} else {
			switch ($tipe) {
				case "ltc-bds":
					$avg="end_to_end_delay_avg/1000";
					$verifier = "BTC";
					$threshold = "threshold_latency_batam";
					$target_achievement = "target_achievement_latency";
					break;
				case "ltc-btc":
					$avg="end_to_end_delay_avg/1000";
					$verifier = "BDS";
					$threshold = "threshold_latency_batam";
					$target_achievement = "target_achievement_latency";
					break;
				case "ltc-pnk":
					$avg="end_to_end_delay_avg/1000";
					$verifier = "PNK";
					$threshold = "threshold_latency_manado";
					$target_achievement = "target_achievement_latency";
					break;
				case "pl-bds":
					$avg="percent_lost_packets";
					$verifier = "BDS";
					$threshold = "threshold_packet_loss";
					$target_achievement = "target_achievement_packet_loss";
					break;
				case "pl-btc":
					$avg="percent_lost_packets";
					$verifier = "BTC";
					$threshold = "threshold_packet_loss";
					$target_achievement = "target_achievement_packet_loss";
					break;
				case "pl-pnk":
					$avg="percent_lost_packets";
					$verifier = "PNK";
					$threshold = "threshold_packet_loss";
					$target_achievement = "target_achievement_packet_loss";
					break;
				default:
					$avg="end_to_end_delay_avg/1000";
					$verifier = "BTC";
					$threshold = "threshold_latency_batam";
					$target_achievement = "target_achievement_latency";
			}
			
			$query = "SELECT m.nama, IF((m.clear/m.total)*100 >= m.$target_achievement,0,1)AS yn
				FROM (SELECT $field AS nama, c.$target_achievement, COUNT(IF (a.avg < c.$threshold, 1,NULL)) AS clear, COUNT(*)as total FROM
				((SELECT host_name, AVG($avg)AS avg FROM brix_exfo_mart
				WHERE tipe='ebr' AND SUBSTRING(verifier_id,7,3)='$verifier' AND
				DATE_FORMAT(timestamp, '%Y-%m-%d %H')=(SELECT MAX(DATE_FORMAT(timestamp, '%Y-%m-%d %H')) FROM brix_exfo_mart WHERE DATE_FORMAT(timestamp, '%Y-%m-%d %H')<='$tgl $jam')
				GROUP BY host_name)a INNER JOIN brix_hostname b ON a.host_name=b.ipoam
				INNER JOIN (SELECT DISTINCT region_tsel, $threshold, $target_achievement FROM sla_core2internet WHERE year='$tahun')c
				ON b.region_tsel=c.region_tsel) GROUP BY $field,c.$target_achievement)m";
			$dt["color"] = $this->db->query($query)->getResultArray();
		}
			$dt["jam"] = $jam;
			$dt["jam1"] = $jam1;
			
			//BOX1
			$query = "SELECT COUNT(IF(c.cl=0,1,NULL))AS ac, COUNT(c.cl)AS tot
			FROM (SELECT a.$field1 AS nama, SUM(IF((a.clear/a.c)*100>b.target_achievement_latency,0,1))AS cl
			FROM (SELECT date AS tgl, $field2, COUNT(IF(lat_stat_rev='CLEAR',1,NULL))AS clear, COUNT(lat_stat_rev)AS c
			FROM twamp_telkomsel
			WHERE transport_owner='TELKOM' AND date=(SELECT MAX(date)FROM twamp_telkomsel WHERE date<='$tgl') $filter
			GROUP BY tgl,$field2)a INNER JOIN
			(SELECT DISTINCT region_tsel, target_achievement_latency FROM sla_4g WHERE year=(SELECT MAX(year)FROM sla_4g)) b
			ON a.region=b.region_tsel
			GROUP BY nama)c";
			if ($region<>"treg") $dt["box1"] = $this->db->query($query)->getResultArray();
			
			//BOX2
			$query = "SELECT COUNT(IF((aa.clear/aa.total)*100>=aa.target,1,NULL))AS clear, COUNT(*)AS tot FROM
			(SELECT $field AS nama, c.target_achievement_latency AS target, a.vid,
			COUNT(IF (a.avg < IF(a.vid='PNK',c.threshold_latency_manado,c.threshold_latency_batam), 1,NULL)) AS clear,
			COUNT(*)as total FROM (SELECT DATE_FORMAT(timestamp, '%Y-%m-%d %H')AS tgl, host_name,
			SUBSTRING(verifier_id,7,3)AS vid, AVG(end_to_end_delay_avg/1000)AS avg FROM brix_exfo_mart WHERE tipe='ebr' AND
			DATE_FORMAT(timestamp, '%Y-%m-%d %H')=(SELECT MAX(DATE_FORMAT(timestamp, '%Y-%m-%d %H'))FROM brix_exfo_mart WHERE DATE_FORMAT(timestamp, '%Y-%m-%d %H')<='$tgl $jam')
			GROUP BY tgl, host_name, vid) a, brix_hostname b,
			(SELECT DISTINCT region_tsel, threshold_latency_batam, threshold_latency_manado, target_achievement_latency
			FROM sla_core2internet WHERE year=$tahun)c WHERE a.host_name=b.ipoam AND b.region_tsel=c.region_tsel
			GROUP BY nama, target, vid)aa";
			if ($region=="treg" OR $region=="region") $dt["box2"] = $this->db->query($query)->getResultArray();
			/*
			$query = "SELECT aa.clear, (aa.total-aa.clear)AS notclear, ROUND((aa.clear/aa.total)*100,0)AS persen, IF((aa.clear/aa.total)*100 > aa.target_achievement_latency, \"yes\", \"no\")AS achivement
			FROM (SELECT c.target_achievement_latency, COUNT(IF (a.avg < IF(a.vid=\"PNK\",c.threshold_latency_manado,c.threshold_latency_batam), 1,NULL)) AS clear, COUNT(*)as total
				FROM (SELECT DATE_FORMAT(timestamp, \"%Y-%m-%d %H\")AS tgl, host_name, SUBSTRING(verifier_id,7,3)AS vid, AVG(end_to_end_delay_avg/1000)AS avg
				FROM brix_exfo
				WHERE tipe=\"ebr\" AND DATE_FORMAT(timestamp, \"%Y-%m-%d %H\")=\"$tgl $jam1\"
				GROUP BY host_name, tgl, vid) a,
			brix_hostname b, sla_core2internet c
			WHERE a.host_name=b.ipoam AND b.region_tsel=c.region_tsel
			GROUP BY c.target_achievement_latency)aa";
			$dt["box2"] = $this->db->query($query)->getResultArray();
			*/
			
			//BOX3
			$query = "SELECT DATE_FORMAT(date, '%Y-%m-%d %H')AS tgl, COUNT(IF(final_status='OPEN',1,NULL))AS o, COUNT(IF(final_status='CLOSED',1,NULL))AS c
				FROM red_transport WHERE UPPER(transport_owner)='TELKOM' AND
				DATE_FORMAT(date, '%Y-%m-%d %H')=(SELECT MAX(DATE_FORMAT(date, '%Y-%m-%d %H')) FROM red_transport WHERE DATE_FORMAT(date, '%Y-%m-%d %H')<='$tgl $jam')
				GROUP BY tgl";
			$dt["box3"] = $this->db->query($query)->getResultArray();
		//}
		
		return $dt;
	}
	
	public function tutela_available($level) {
		// AND datetime>DATE_SUB(NOW(), INTERVAL 72 HOUR)
		$query = "SELECT DATE_FORMAT(datetime, '%Y-%m-%d %H')AS tgl, COUNT(benchmark_latency)AS rowc
		FROM tutela_benchmark_latency_mobile_hourly_kabupaten_mart
		WHERE benchmark_latency<>''
		GROUP BY tgl
		HAVING rowc>410
		ORDER BY tgl DESC
		LIMIT 1";
		$res = $this->db->query($query)->getResultArray();
		return $res;
	}
	public function tutela_cx_lpg($level,$tgl,$jam) {
		$filter=" ";
		if (isset($_GET["kab"])) $filter .= "AND kabupaten='" . $_GET["kab"] . "' ";
		if (isset($_GET["kec"])) $filter .= "AND kecamatan='" . $_GET["kec"] . "' ";
		$field = strtoupper($level)=="WITEL"?"location":$level;
		$query = "SELECT " . $field . " AS nama,benchmark_latency AS lat,benchmark_packetloss AS pl, benchmark_gp AS gp
		FROM tutela_benchmark_latency_mobile_hourly_" . $level . "_mart
		WHERE DATE_FORMAT(datetime, '%Y-%m-%d %H')='$tgl $jam'" . $filter;
		if (strtoupper($level)=="WITEL") return ["d"=>$tgl, "h"=>$jam, "a"=>$this->db->query($query)->getResultArray(), "b"=>[]];
		$ss = "SELECT " . $field . " AS nama,signal_strength_classification AS ss
		FROM tutela_hourly_" . $level . "_mart
		WHERE operator='Telkomsel' AND date='$tgl' AND hour='$jam'" . $filter;
		return ["d"=>$tgl, "h"=>$jam, "a"=>$this->db->query($query)->getResultArray(), "b"=>$this->db->query($ss)->getResultArray()];
	}
	
	public function telegramAlertHourly1() {
		$query = "SELECT b.reg_telkom, a.*, c.dlat, c.dpl, ROUND(c.dlat-a.lat,1)AS glat, ROUND(c.dpl-a.pl,1)AS gpl,
			(CASE 
			  WHEN c.dlat-a.lat>0.3 THEN 'IMPROVE'
			  WHEN c.dlat-a.lat<-0.3 THEN 'DEGRADE'
			  ELSE 'MAINTAIN'
			END)AS slat,
			(CASE 
			  WHEN c.dpl-a.pl>0.5 THEN 'IMPROVE'
			  WHEN c.dpl-a.pl<-0.5 THEN 'DEGRADE'
			  ELSE 'MAINTAIN'
			END)AS spl
			FROM  
			(SELECT region, ROUND(AVG(avg_latency),1)AS lat, ROUND(AVG(avg_packetloss),1)AS pl
			FROM tutela_hourly_region_mart
			WHERE operator='Telkomsel' AND
			date>=DATE_FORMAT(CURRENT_DATE - INTERVAL 3 MONTH, '%Y/%m/01') AND
			date<=DATE_FORMAT(DATE_FORMAT(CURRENT_DATE, '%Y/%m/01') - INTERVAL 1 DAY, '%Y/%m/%d')
			GROUP BY region)a INNER JOIN 
			(SELECT reg_telkom,region FROM region)b ON a.region=b.region INNER JOIN 
			(SELECT region, ROUND(AVG(avg_latency),1)AS dlat, ROUND(AVG(avg_packetloss),1)AS dpl
			FROM tutela_hourly_region_mart
			WHERE operator='Telkomsel' AND
			CONCAT(date,' ',hour)=(SELECT DATE_FORMAT(DATE_FORMAT(CONCAT(MAX(date),' ',(
			SELECT MAX(hour) FROM tutela_hourly_region_mart
			WHERE date=(SELECT MAX(date) FROM tutela_hourly_region_mart))), '%Y-%m-%d %k')- INTERVAL 9 HOUR, '%Y-%m-%d %k')
			FROM tutela_hourly_region_mart)
			GROUP BY region) c ON a.region=c.region
			ORDER BY reg_telkom";
		
		$query = "SELECT DATE_FORMAT(c.tgl, '%Y %M %d | %H:%i WIB')AS tgl, b.reg_telkom, a.*, c.dlat, c.dpl,
			ROUND(c.dlat-a.lat,1)AS glat, ROUND(c.dpl-a.pl,1)AS gpl,
			(CASE 
			  WHEN c.dlat-a.lat>0.3 THEN 'IMPROVE'
			  WHEN c.dlat-a.lat<-0.3 THEN 'DEGRADE'
			  ELSE 'MAINTAIN'
			END)AS slat,
			(CASE 
			  WHEN c.dlat-a.lat>0.5 THEN 'IMPROVE'
			  WHEN c.dlat-a.lat<-0.5 THEN 'DEGRADE'
			  ELSE 'MAINTAIN'
			END)AS spl
			FROM  
			(SELECT region, ROUND(AVG(avg_latency),1)AS lat, ROUND(AVG(avg_packetloss),1)AS pl
			FROM tutela_hourly_region_mart
			WHERE operator='Telkomsel' AND
			date>=DATE_FORMAT(CURRENT_DATE - INTERVAL 3 MONTH, '%Y/%m/01') AND
			date<=DATE_FORMAT(DATE_FORMAT(CURRENT_DATE, '%Y/%m/01') - INTERVAL 1 DAY, '%Y/%m/%d')
			GROUP BY region)a INNER JOIN 
			(SELECT reg_telkom,region FROM region)b ON a.region=b.region INNER JOIN 
			(SELECT CONCAT(date,' ',hour)AS tgl, region, ROUND(AVG(avg_latency),1)AS dlat, ROUND(AVG(avg_packetloss),1)AS dpl
			FROM tutela_hourly_region
			WHERE operator='Telkomsel' AND
			CONCAT(date,' ',hour)=(SELECT MAX(DATE_FORMAT(DATE_FORMAT(CONCAT(date,' ',hour), '%Y-%m-%d %k') - INTERVAL 9 HOUR, '%Y-%m-%d %k'))
			FROM tutela_hourly_region)
			GROUP BY tgl, region) c ON a.region=c.region
			ORDER BY reg_telkom";
			
		return $this->db->query($query)->getResultArray();
	}
	
	public function telegramAlertHourly() {
		/*
		$query = "SELECT b.tgl, a.*, b.dlat, b.dpl, ROUND(b.dlat-a.lat, 1)AS glat, ROUND(b.dpl-a.pl, 1)AS gpl FROM
			(SELECT REGION, ROUND(AVG(AVG_LATENCY),1)AS lat, ROUND(AVG(AVG_PACKETLOSS),1)AS pl
			FROM tutela_hourly_region_mart
			WHERE OPERATOR='TELKOMSEL' AND
			DATE>=(SELECT DATE_FORMAT(MAX(DATE), '%Y-%m-01') - INTERVAL 3 MONTH FROM tutela_hourly_region_mart) AND
			DATE<=(SELECT DATE_FORMAT(MAX(DATE), '%Y-%m-01') - INTERVAL 1 DAY FROM tutela_hourly_region_mart)
			GROUP BY REGION)a INNER JOIN
			(SELECT DATE_FORMAT(CONCAT(DATE,' ',HOUR), '%Y %M %d | %H:%i WIB')AS tgl, REGION, ROUND(AVG(AVG_LATENCY),1)AS DLAT, ROUND(AVG(AVG_PACKETLOSS),1)AS DPL
			FROM tutela_hourly_region_mart
			WHERE OPERATOR='TELKOMSEL' AND
			CONCAT(DATE,' ',HOUR)=(SELECT DATE_FORMAT(MAX(DATE_FORMAT(CONCAT(DATE,' ',HOUR), '%Y-%m-%d %k')) - INTERVAL 9 HOUR, '%Y-%m-%d %k') FROM tutela_hourly_region_mart)
			GROUP BY tgl, REGION)b ON a.region=b.region";
		
		$query = "SELECT b.tgl, a.*, b.dlat, b.dpl, ROUND(b.dlat-a.lat, 1)AS glat, ROUND(b.dpl-a.pl, 1)AS gpl FROM
			(SELECT REGION, ROUND(AVG(AVG_LATENCY),1)AS lat, ROUND(AVG(AVG_PACKETLOSS),1)AS pl
			FROM tutela_hourly_region_mart
			WHERE OPERATOR='TELKOMSEL' AND
			DATE>=(SELECT DATE_FORMAT(MAX(DATE), '%Y-%m-01') - INTERVAL 3 MONTH FROM tutela_hourly_region_mart) AND
			DATE<=(SELECT DATE_FORMAT(MAX(DATE), '%Y-%m-01') - INTERVAL 1 DAY FROM tutela_hourly_region_mart)
			GROUP BY REGION)a INNER JOIN
			(SELECT DATE_FORMAT(CONCAT(DATE,' ',HOUR), '%Y %M %d | %H:%i WIB')AS tgl, REGION, ROUND(AVG(AVG_LATENCY),1)AS DLAT, ROUND(AVG(AVG_PACKETLOSS),1)AS DPL
			FROM tutela_hourly_region_mart
			WHERE OPERATOR='TELKOMSEL' AND
			CONCAT(DATE,' ',HOUR)=(SELECT DATE_FORMAT(NOW() - INTERVAL 9 HOUR, '%Y-%m-%d %k'))
			GROUP BY tgl, REGION)b ON a.region=b.region";
		*/
		$query = "SELECT b.tgl, a.region, b.dlat, a.lat, ROUND(b.dlat-a.lat, 1)AS glat, b.dpl, a.pl, ROUND(b.dpl-a.pl, 1)AS gpl,
			(CASE
				WHEN a.region = 'SUMBAGUT' THEN 1
				WHEN a.region = 'SUMBAGTENG' THEN 2
				WHEN a.region = 'SUMBAGSEL' THEN 3
				WHEN a.region = 'CENTRAL JABOTABEK' THEN 4
				WHEN a.region = 'EASTERN JABOTABEK' THEN 5
				WHEN a.region = 'WESTERN JABOTABEK' THEN 5
				WHEN a.region = 'JABAR' THEN 6
				WHEN a.region = 'JATENG-DIY' THEN 7
				WHEN a.region = 'JATIM' THEN 8
				WHEN a.region = 'BALI NUSRA' THEN 9
				WHEN a.region = 'KALIMANTAN' THEN 10
				WHEN a.region = 'SULAWESI' THEN 11
				WHEN a.region = 'MALUKU DAN PAPUA' THEN 12
				WHEN a.region = 'INNER JABOTABEK' THEN 4
				WHEN a.region = 'OUTER JABOTABEK' THEN 5
			END)AS urutan
			FROM
			(SELECT REGION, ROUND(AVG(AVG_LATENCY),1)AS lat, ROUND(AVG(AVG_PACKETLOSS),1)AS pl
			FROM tutela_hourly_region_mart
			WHERE OPERATOR='TELKOMSEL' AND
			DATE>=(SELECT DATE_FORMAT(MAX(DATE), '%Y-%m-01') - INTERVAL 3 MONTH FROM tutela_hourly_region_mart) AND
			DATE<=(SELECT DATE_FORMAT(MAX(DATE), '%Y-%m-01') - INTERVAL 1 DAY FROM tutela_hourly_region_mart)
			GROUP BY REGION)a INNER JOIN
			(SELECT DATE_FORMAT(CONCAT(DATE,' ',HOUR), '%d %M %Y | %H:%i WIB')AS tgl, region,
			ROUND(AVG(AVG_LATENCY),1)AS dlat, ROUND(AVG(AVG_PACKETLOSS),1)AS dpl
			FROM tutela_hourly_region_mart
			WHERE OPERATOR='TELKOMSEL' AND
			CONCAT(DATE,' ',HOUR)=(SELECT DATE_FORMAT(NOW() - INTERVAL 9 HOUR, '%Y-%m-%d %k'))
			GROUP BY tgl, REGION)b ON a.region=b.region
			AND (b.dlat-a.lat >= 3 OR b.dpl-a.pl >= 0.5)
			ORDER BY urutan";
		
		return $this->db->query($query)->getResultArray();
	}
	
	public function telegramAlertHourlyLat() {
		$query = "SELECT b.tgl, a.region, ROUND(b.dlat-a.lat, 1)AS glat FROM
			(SELECT region, ROUND(AVG(AVG_LATENCY),1)AS lat
			FROM tutela_hourly_region_mart
			WHERE OPERATOR='TELKOMSEL' AND
			DATE>=(SELECT DATE_FORMAT(MAX(DATE), '%Y-%m-01') - INTERVAL 3 MONTH FROM tutela_hourly_region_mart) AND
			DATE<=(SELECT DATE_FORMAT(MAX(DATE), '%Y-%m-01') - INTERVAL 1 DAY FROM tutela_hourly_region_mart)
			GROUP BY REGION)a INNER JOIN
			(SELECT DATE_FORMAT(CONCAT(DATE,' ',HOUR), '%Y %M %d | %H:%i WIB')AS tgl, region, ROUND(AVG(AVG_LATENCY),1)AS dlat
			FROM tutela_hourly_region_mart
			WHERE OPERATOR='TELKOMSEL' AND
			CONCAT(DATE,' ',HOUR)=(SELECT DATE_FORMAT(NOW() - INTERVAL 9 HOUR, '%Y-%m-%d %k'))
			GROUP BY tgl, REGION)b ON a.region=b.region AND b.dlat-a.lat>=3
			ORDER BY glat DESC";
		
		return $this->db->query($query)->getResultArray();
	}
	
	public function telegramAlertHourlyPl() {
		$query = "SELECT b.tgl, a.region, ROUND(b.dpl-a.pl, 1)AS gpl FROM
			(SELECT region, ROUND(AVG(AVG_PACKETLOSS),1)AS pl
			FROM tutela_hourly_region_mart
			WHERE OPERATOR='TELKOMSEL' AND
			DATE>=(SELECT DATE_FORMAT(MAX(DATE), '%Y-%m-01') - INTERVAL 3 MONTH FROM tutela_hourly_region_mart) AND
			DATE<=(SELECT DATE_FORMAT(MAX(DATE), '%Y-%m-01') - INTERVAL 1 DAY FROM tutela_hourly_region_mart)
			GROUP BY REGION)a INNER JOIN
			(SELECT DATE_FORMAT(CONCAT(DATE,' ',HOUR), '%Y %M %d | %H:%i WIB')AS tgl, region, ROUND(AVG(AVG_PACKETLOSS),1)AS dpl
			FROM tutela_hourly_region_mart
			WHERE OPERATOR='TELKOMSEL' AND
			CONCAT(DATE,' ',HOUR)=(SELECT DATE_FORMAT(NOW() - INTERVAL 9 HOUR, '%Y-%m-%d %k'))
			GROUP BY tgl, REGION)b ON a.region=b.region AND b.dpl-a.pl>=0.5
			ORDER BY gpl DESC";
		
		return $this->db->query($query)->getResultArray();
	}
	
	public function telegramAlertDaily() {
		$query = "SELECT DATE_FORMAT(date, '%Y %M %d')AS tgl, treg, region,
			ROUND(AVG(baseline_latency), 2)AS blat, ROUND(AVG(baseline_packetloss), 2)AS bpl,
			ROUND(AVG(avg_latency), 2)AS lat, ROUND(AVG(avg_packetloss), 2)AS pl, COUNT(*)AS total, 
			COUNT(IF(avg_latency-baseline_latency>3,1,NULL))AS ImpLat,
			COUNT(IF(avg_latency-baseline_latency>=-3 AND avg_latency-baseline_latency<=3,1,NULL))AS MtLat,
			COUNT(IF(avg_latency-baseline_latency<-3,1,NULL))AS DegLat,
			COUNT(IF(avg_packetloss-baseline_packetloss>0.5,1,NULL))AS ImpPl,
			COUNT(IF(avg_packetloss-baseline_packetloss>=-0.5 AND avg_packetloss-baseline_packetloss<=0.5,1,NULL))AS MtPl,
			COUNT(IF(avg_packetloss-baseline_packetloss<-0.5,1,NULL))AS DegPl
			FROM alert_kabupaten_daily
			WHERE date=(SELECT MAX(date) FROM alert_kabupaten_daily)
			GROUP BY tgl, treg, region
			ORDER BY treg";
		
		$query = "SELECT DATE_FORMAT(date, '%Y %M %d')AS tgl,
			(CASE
				WHEN region = 'JATENG-DIY' THEN 'JATENG'
				WHEN region = 'BALI NUSRA' THEN 'BALINUSRA'
				WHEN region = 'MALUKU DAN PAPUA' THEN 'PUMA'
				WHEN region = 'CENTRAL JABOTABEK' THEN 'JABO INNER'
				WHEN region = 'EASTERN JABOTABEK' THEN 'JABO OUTER'
				WHEN region = 'WESTERN JABOTABEK' THEN 'JABO OUTER'
				WHEN region = 'INNER JABOTABEK' THEN 'JABO INNER'
				WHEN region = 'OUTER JABOTABEK' THEN 'JABO OUTER'
				ELSE region
			END)AS rgn,
			ROUND(AVG(baseline_latency), 2)AS blat, ROUND(AVG(baseline_packetloss), 2)AS bpl,
			ROUND(AVG(avg_latency), 2)AS lat, ROUND(AVG(avg_packetloss), 2)AS pl, COUNT(*)AS total, 
			COUNT(IF(baseline_latency-avg_latency>=3,1,NULL))AS ImpLat,
			COUNT(IF(baseline_latency-avg_latency>-3 AND avg_latency-baseline_latency<3,1,NULL))AS MtLat,
			COUNT(IF(baseline_latency-avg_latency<=-3,1,NULL))AS DegLat,
			COUNT(IF(baseline_packetloss-avg_packetloss>=0.5,1,NULL))AS ImpPl,
			COUNT(IF(baseline_packetloss-avg_packetloss>-0.5 AND avg_packetloss-baseline_packetloss<0.5,1,NULL))AS MtPl,
			COUNT(IF(baseline_packetloss-avg_packetloss<=-0.5,1,NULL))AS DegPl
			FROM alert_kabupaten_daily
			WHERE date=DATE_FORMAT(CURRENT_DATE() - 1, '%Y-%m-%d')
			GROUP BY tgl, rgn";
		
		$query = "SELECT DATE_FORMAT(date, '%d %M %Y')AS tgl,
			(CASE
				WHEN region = 'SUMBAGUT' THEN 1
				WHEN region = 'SUMBAGTENG' THEN 2
				WHEN region = 'SUMBAGSEL' THEN 3
				WHEN region = 'CENTRAL JABOTABEK' THEN 4
				WHEN region = 'EASTERN JABOTABEK' THEN 5
				WHEN region = 'WESTERN JABOTABEK' THEN 5
				WHEN region = 'JABAR' THEN 6
				WHEN region = 'JATENG-DIY' THEN 7
				WHEN region = 'JATIM' THEN 8
				WHEN region = 'BALI NUSRA' THEN 9
				WHEN region = 'KALIMANTAN' THEN 10
				WHEN region = 'SULAWESI' THEN 11
				WHEN region = 'MALUKU DAN PAPUA' THEN 12
				WHEN region = 'INNER JABOTABEK' THEN 4
				WHEN region = 'OUTER JABOTABEK' THEN 5
			END)AS urutan,
			(CASE
				WHEN region = 'JATENG-DIY' THEN 'JATENG'
				WHEN region = 'BALI NUSRA' THEN 'BALINUSRA'
				WHEN region = 'MALUKU DAN PAPUA' THEN 'PUMA'
				WHEN region = 'CENTRAL JABOTABEK' THEN 'JABO INNER'
				WHEN region = 'EASTERN JABOTABEK' THEN 'JABO OUTER'
				WHEN region = 'WESTERN JABOTABEK' THEN 'JABO OUTER'
				WHEN region = 'INNER JABOTABEK' THEN 'JABO INNER'
				WHEN region = 'OUTER JABOTABEK' THEN 'JABO OUTER'
				ELSE region
			END)AS rgn,
			COUNT(*)AS total,
			COUNT(IF(baseline_latency-avg_latency<=-3,1,NULL))AS DegLat,
			COUNT(IF(baseline_packetloss-avg_packetloss<=-0.5,1,NULL))AS DegPl
			FROM alert_kabupaten_daily
			WHERE date=DATE_FORMAT(CURRENT_DATE() - 1, '%Y-%m-%d')
			GROUP BY tgl, urutan, rgn
			ORDER BY urutan";
			
		return $this->db->query($query)->getResultArray();
	}
	
	public function telegramAlertDailyDetail($tgl) {
		
		$query = "SELECT DATE_FORMAT(date, '%d %M %Y')AS tgl,
			(CASE
				WHEN region = 'SUMBAGUT' THEN 1
				WHEN region = 'SUMBAGTENG' THEN 2
				WHEN region = 'SUMBAGSEL' THEN 3
				WHEN region = 'CENTRAL JABOTABEK' THEN 4
				WHEN region = 'EASTERN JABOTABEK' THEN 5
				WHEN region = 'WESTERN JABOTABEK' THEN 5
				WHEN region = 'JABAR' THEN 6
				WHEN region = 'JATENG-DIY' THEN 7
				WHEN region = 'JATIM' THEN 8
				WHEN region = 'BALI NUSRA' THEN 9
				WHEN region = 'KALIMANTAN' THEN 10
				WHEN region = 'SULAWESI' THEN 11
				WHEN region = 'MALUKU DAN PAPUA' THEN 12
				WHEN region = 'INNER JABOTABEK' THEN 4
				WHEN region = 'OUTER JABOTABEK' THEN 5
			END)AS urutan,
			(CASE
				WHEN region = 'JATENG-DIY' THEN 'JATENG'
				WHEN region = 'BALI NUSRA' THEN 'BALINUSRA'
				WHEN region = 'MALUKU DAN PAPUA' THEN 'PUMA'
				WHEN region = 'CENTRAL JABOTABEK' THEN 'JABO INNER'
				WHEN region = 'EASTERN JABOTABEK' THEN 'JABO OUTER'
				WHEN region = 'WESTERN JABOTABEK' THEN 'JABO OUTER'
				WHEN region = 'INNER JABOTABEK' THEN 'JABO INNER'
				WHEN region = 'OUTER JABOTABEK' THEN 'JABO OUTER'
				ELSE region
			END)AS rgn,
			ROUND(AVG(baseline_latency), 2)AS blat, ROUND(AVG(baseline_packetloss), 2)AS bpl,
			ROUND(AVG(avg_latency), 2)AS lat, ROUND(AVG(avg_packetloss), 2)AS pl, COUNT(*)AS total, 
			COUNT(IF(baseline_latency-avg_latency>=3,1,NULL))AS ImpLat,
			COUNT(IF(baseline_latency-avg_latency>-3 AND baseline_latency-avg_latency<3,1,NULL))AS MtLat,
			COUNT(IF(baseline_latency-avg_latency<=-3,1,NULL))AS DegLat,
			COUNT(IF(baseline_packetloss-avg_packetloss>=0.5,1,NULL))AS ImpPl,
			COUNT(IF(baseline_packetloss-avg_packetloss>-0.5 AND baseline_packetloss-avg_packetloss<0.5,1,NULL))AS MtPl,
			COUNT(IF(baseline_packetloss-avg_packetloss<=-0.5,1,NULL))AS DegPl
			FROM alert_kabupaten_daily
			WHERE date='$tgl'
			GROUP BY tgl, urutan, rgn
			ORDER BY urutan";
		
		$data["region"] = $this->db->query($query)->getResultArray();
		
		$query = "SELECT DATE_FORMAT(date, '%d %M %Y')AS tgl,
			(CASE
				WHEN region = 'SUMBAGUT' THEN 1
				WHEN region = 'SUMBAGTENG' THEN 2
				WHEN region = 'SUMBAGSEL' THEN 3
				WHEN region = 'CENTRAL JABOTABEK' THEN 4
				WHEN region = 'EASTERN JABOTABEK' THEN 5
				WHEN region = 'WESTERN JABOTABEK' THEN 5
				WHEN region = 'JABAR' THEN 6
				WHEN region = 'JATENG-DIY' THEN 7
				WHEN region = 'JATIM' THEN 8
				WHEN region = 'BALI NUSRA' THEN 9
				WHEN region = 'KALIMANTAN' THEN 10
				WHEN region = 'SULAWESI' THEN 11
				WHEN region = 'MALUKU DAN PAPUA' THEN 12
				WHEN region = 'INNER JABOTABEK' THEN 4
				WHEN region = 'OUTER JABOTABEK' THEN 5
			END)AS urutan,
			(CASE
				WHEN region = 'JATENG-DIY' THEN 'JATENG'
				WHEN region = 'BALI NUSRA' THEN 'BALINUSRA'
				WHEN region = 'MALUKU DAN PAPUA' THEN 'PUMA'
				WHEN region = 'CENTRAL JABOTABEK' THEN 'JABO INNER'
				WHEN region = 'EASTERN JABOTABEK' THEN 'JABO OUTER'
				WHEN region = 'WESTERN JABOTABEK' THEN 'JABO OUTER'
				WHEN region = 'INNER JABOTABEK' THEN 'JABO INNER'
				WHEN region = 'OUTER JABOTABEK' THEN 'JABO OUTER'
				ELSE region
			END)AS rgn,
			kabupaten,
			baseline_latency, avg_latency,
			(CASE
				WHEN baseline_latency - avg_latency >= 3 THEN 'IMPROVE'
				WHEN baseline_latency - avg_latency <= -3 THEN 'DEGRADE'
				ELSE 'MAINTAIN'
			END)AS latStat,
			baseline_packetloss, avg_packetloss,
			(CASE
				WHEN baseline_packetloss - avg_packetloss >= 0.5 THEN 'IMPROVE'
				WHEN baseline_packetloss - avg_packetloss <= -0.5 THEN 'DEGRADE'
				ELSE 'MAINTAIN'
			END)AS plStat
			FROM alert_kabupaten_daily
			WHERE date='$tgl'
			ORDER BY urutan";
		
		$data["kabupaten"] = $this->db->query($query)->getResultArray();
		return $data;
	}
	
	public function telegramAlertDailyLat() {
		$query = "SELECT DATE_FORMAT(date, '%Y %M %d')AS tgl,
			(CASE
				WHEN region = 'JATENG-DIY' THEN 'JATENG'
				WHEN region = 'BALI NUSRA' THEN 'BALINUSRA'
				WHEN region = 'MALUKU DAN PAPUA' THEN 'PUMA'
				WHEN region = 'CENTRAL JABOTABEK' THEN 'JABO INNER'
				WHEN region = 'EASTERN JABOTABEK' THEN 'JABO OUTER'
				WHEN region = 'WESTERN JABOTABEK' THEN 'JABO OUTER'
				WHEN region = 'INNER JABOTABEK' THEN 'JABO INNER'
				WHEN region = 'OUTER JABOTABEK' THEN 'JABO OUTER'
				ELSE region
			END)AS rgn,
			COUNT(*)AS total, 
			COUNT(IF(avg_latency-baseline_latency<-3,1,NULL))AS DegLat
			FROM alert_kabupaten_daily
			WHERE date=DATE_FORMAT(CURRENT_DATE() - 1, '%Y-%m-%d')
			GROUP BY tgl, rgn
			HAVING COUNT(IF(avg_latency-baseline_latency<-3,1,NULL))>0
			ORDER BY DegLat DESC";
		
		return $this->db->query($query)->getResultArray();
	}
	
	public function telegramAlertDailyPl() {
		$query = "SELECT DATE_FORMAT(date, '%Y %M %d')AS tgl,
			(CASE
				WHEN region = 'JATENG-DIY' THEN 'JATENG'
				WHEN region = 'BALI NUSRA' THEN 'BALINUSRA'
				WHEN region = 'MALUKU DAN PAPUA' THEN 'PUMA'
				WHEN region = 'CENTRAL JABOTABEK' THEN 'JABO INNER'
				WHEN region = 'EASTERN JABOTABEK' THEN 'JABO OUTER'
				WHEN region = 'WESTERN JABOTABEK' THEN 'JABO OUTER'
				WHEN region = 'INNER JABOTABEK' THEN 'JABO INNER'
				WHEN region = 'OUTER JABOTABEK' THEN 'JABO OUTER'
				ELSE region
			END)AS rgn,
			COUNT(*)AS total, 
			COUNT(IF(avg_packetloss-baseline_packetloss<-0.5,1,NULL))AS DegPl
			FROM alert_kabupaten_daily
			WHERE date=DATE_FORMAT(CURRENT_DATE() - 1, '%Y-%m-%d')
			GROUP BY tgl, rgn
			HAVING COUNT(IF(avg_packetloss-baseline_packetloss<-0.5,1,NULL))>0
			ORDER BY DegPl DESC";
		
		return $this->db->query($query)->getResultArray();
	}
	
	public function tutela_benchmark($level) {
		switch ($level) {
			case 0 : 
				$where = "";
				if (isset($_GET["map"])) {
					switch ($_GET["map"]) {
						case "area" : 
							$table = $this->table_benchmark_area; 
							break;
						case "treg" : 
							$table = $this->table_benchmark_treg;
							break;
						case "region" : 
							$table = $this->table_benchmark_region;
							break;
						case "kab" : 
							$table = $this->table_benchmark_kabupaten;
							break;
					}
				}
				
				if (isset($_GET["area"])) {
					$field = "area";
					$where = "and area='".$this->region_clean($_GET["area"])."'";
					$table = $this->table_benchmark_treg;
				} else if (isset($_GET["treg"])) {
					$field = "treg";
					$where = "and treg='".$this->region_clean($_GET["treg"])."'";
					$table = $this->table_benchmark_region;
				} else if (isset($_GET["region"])) {
					$field = "treg";
					$where = "and treg='".$this->region_clean($_GET["region"])."'";
					$table = $this->table_benchmark_region;
				} else if (isset($_GET["kab"])) {
					$field = "kabupaten";
					$where = "and kabupaten='".$this->region_clean($_GET["kab"])."'";
					$table = $this->table_benchmark_kabupaten;
				} else if (isset($_GET["kec"])) {
					$field = "kecamatan";
					$where = "and kecamatan='".$this->region_clean($_GET["kec"])."'";
					$table = $this->table_benchmark_kecamatan;
				}  else if (isset($_GET["desa"])) {
					$field = "desa";
					$where = "and desa='".$this->region_clean($_GET["desa"])."'";
					$table = $this->table_benchmark_desa;
				} 
				
				break;
			case 3 : 
				$where = "and region = '".$_GET["region"]."'";
				$field = "kabupaten";	
				$table = $this->table_benchmark_kabupaten; 
				break;
			case 4 : 
				$where = "and kabupaten = '".$_GET["kab"]."'";
				$field = "kecamatan";	
				$table = $this->table_benchmark_kecamatan; 
				break;
			case 5 : 
				$where = "and kecamatan = '".$_GET["kec"]."'";
				$field = "desa";	
				$table = $this->table_benchmark_desa; 
				break;
			default :
				$table = $this->table_benchmark_area;
		}
		
		if (isset($_GET["date"]) && isset($_GET["hour"]))
			$where_periode = " date_format(datetime,'%Y-%m-%d %H') = '".$_GET["date"]." ".$this->two($_GET["hour"])."'";
		else
			$where_periode = " date_format(datetime,'%Y-%m-%d') = (select `date` from dashboard) and date_format(datetime,'%H') = (select `hour` from dashboard)";
		
		
		$query = "select 
						benchmark_latency latency,
						benchmark_packetloss packetloss,
						benchmark_gp gp,
						count(1) cnt
					from 
						".$table." a
					where
						$where_periode
						$where
					group by 
						benchmark_latency,
						benchmark_packetloss,
						benchmark_gp";
		$data = $this->db->query($query)->getResultArray();
		
		return $data;
	}
	
	public function tutela_hourly($level) {
		switch ($level) {
			case 0 : 
				$where = "";
				if (isset($_GET["map"])) {
					switch ($_GET["map"]) {
						case "area" : 
							$table = $this->table_hourly_area; 
							break;
						case "treg" : 
							$table = $this->table_hourly_treg;
							break;
						case "region" : 
							$table = $this->table_hourly_region;
							break;
						case "witel" : 
							$table = $this->table_hourly_witel;
							break;
						case "kab" : 
							$table = $this->table_hourly_kabupaten;
							break;
					}
				}
				
				if (isset($_GET["area"])) {
					$field = "area";
					$where = "and area='".$this->region_clean($_GET["area"])."'";
					$table = $this->table_hourly_treg;
				} else if (isset($_GET["treg"])) {
					$field = "treg";
					$where = "and treg='".$this->region_clean($_GET["treg"])."'";
					$table = $this->table_hourly_region;
				} else if (isset($_GET["region"])) {
					$field = "kabupaten";
					$where = "and region='".$this->region_clean($_GET["region"])."'";
					$table = $this->table_hourly_kabupaten;
				} else if (isset($_GET["kab"])) {
					$field = "kabupaten";
					$where = "and kabupaten='".$this->region_clean($_GET["kab"])."'";
					$table = $this->table_hourly_kabupaten;
				} else if (isset($_GET["kec"])) {
					$field = "kecamatan";
					$where = "and kecamatan='".$this->region_clean($_GET["kec"])."'";
					$table = $this->table_hourly_kecamatan;
				}  else if (isset($_GET["desa"])) {
					$field = "desa";
					$where = "and desa='".$this->region_clean($_GET["desa"])."'";
					$table = $this->table_hourly_desa;
				} 
				break;
			case 3 : 
				$where = "and region = '".$_GET["region"]."'";
				$field = "kabupaten";	
				$table = $this->table_hourly_kabupaten; 
				break;
			case 4 : 
				$where = "and kabupaten = '".$_GET["kab"]."'";
				$field = "kecamatan";	
				$table = $this->table_hourly_kecamatan; 
				break;
			case 5 : 
				$where = "and kecamatan = '".$_GET["kec"]."'";
				$field = "desa";	
				$table = $this->table_hourly_desa; 
				break;
			default :
				$table = $this->table_benchmark_area;
		}
		
		if (isset($_GET["date"]) && isset($_GET["hour"]))
			$where_periode = " and concat(date,hour) = '".$_GET["date"].$_GET["hour"]."'";
		else
			$where_periode = " and concat(date,hour) = (select concat(date,hour) from dashboard)";
		
		$query = "select 
						signal_strength_classification label,count(cnt) cnt
					from 
						".$table." a
					where
						signal_strength_classification in ('excelent','good','fair','poor')
						and operator = 'Telkomsel'
						$where_periode
						$where
					group by signal_strength_classification";
		$data = $this->db->query($query)->getResultArray();
		return $data;
	}
	
	public function chart($level,$type) {
		switch ($level) {
			case 0 : 
				if (isset($_GET["map"])) {
					switch ($_GET["map"]) {
						case "area" : 
							$table = $this->table_hourly_area; 
							break;
						case "treg" : 
							$table = $this->table_hourly_treg;
							break;
						case "region" : 
							$table = $this->table_hourly_region;
							break;
						case "kab" : 
							$table = $this->table_hourly_kabupaten;
							break;
						case "witel" : 
							$table = $this->table_hourly_witel;
							break;
					}
				}
				break;
			case 3 : 
				$where = "and region = '".$_GET["region"]."'";
				$field = "kabupaten";	
				$table = $this->table_hourly_kabupaten; 
				break;
			case 4 : 
				$where = "and kabupaten = '".$_GET["kab"]."'";
				$field = "kecamatan";	
				$table = $this->table_hourly_kecamatan; 
				break;
			case 5 : 
				$where = "and kecamatan = '".$_GET["kec"]."'";
				$field = "desa";	
				$table = $this->table_hourly_desa; 
				break;
			default :
				$table = $this->table_hourly_area;
		}
		
		$field = "hour";
		if (isset($_GET["tipe"])) {
			
			switch ($_GET["tipe"]) {
				case 0 : 
					$field = "hour"; 
					if (isset($_GET["date"]) && isset($_GET["hour"]))
						$where = " and date = '".$_GET["date"]."' and hour <= ".$this->two($_GET["hour"]);
					else
						$where = " and date = (select date from dashboard) and hour <= (select hour from dashboard)";
					break;
				case 1 : $field = "date"; 
					if (isset($_GET["date"]) && isset($_GET["hour"]))
						$where = " and date >= date_sub('".$_GET["date"]."', interval 30 day) and date <='".$_GET["date"]."'";
					else
						$where = " and date >= date_sub(now(), interval 30 day)";
					
					$where = " ";
					break;
				case 2 : 
					$field = "concat('W',date_format(date,'%U'))"; 
					if (isset($_GET["date"]) && isset($_GET["hour"]))
						$where = " and date >= date_sub('".$_GET["date"]."', interval 30 day) and date <='".$_GET["date"]."'";
					else
						$where = " and date >= date_sub(now(), interval 30 day)";
					
					break;
			}
		}
		
		if (isset($_GET["tsel"])) {
			if ($_GET["tsel"]) {
				$where .= " and operator = 'Telkomsel'";
			}
		}
		
		
		switch ($type) {
			case "latency" : $avg = "avg(avg_latency) latency"; break;
			case "packetloss" : $avg = "avg(avg_packetloss) packetloss"; break;
			case "gp" : $avg = "avg(game_parameter) gp"; break;
			case "signal" : $avg = "avg(avg_signalstrength) `signal`"; break;
			default : 
				$avg = "avg(avg_latency) latency"; break;
		}
		
		$query = "select 
						$field label,
						operator,
						$avg
					from 
						".$table." a
					where
						1 = 1
						".$where."
					group by 
						operator,
						$field";
		$data = $this->db->query($query)->getResultArray();
		return $data;
	}
	
	public function balon($level,$type) {
		switch ($level) {
			case 0 : 
				if (isset($_GET["map"])) {
					$where = "";
					$field = $_GET["map"];
					switch ($_GET["map"]) {
						case "area" : 
							$table = $this->table_hourly_area;
							break;
						case "treg" : 
							$table = $this->table_hourly_treg;
							break;
						case "region" : 
							$where = "";
							$table = $this->table_hourly_region;
							break;
						case "kab" : 
							$table = $this->table_hourly_kabupaten;
							break;
						case "witel" : 
							$table = $this->table_hourly_witel;
							break;
					}
				} else {
					if (isset($_GET["area"])) {
						$field = "area";
						$where = "and area='".$this->region_clean($_GET["area"])."'";
						$table = $this->table_hourly_area;
					} else if (isset($_GET["treg"])) {
						$field = "treg";
						$where = "and treg='".$this->region_clean($_GET["treg"])."'";
						$table = $this->table_hourly_treg;
					} else if (isset($_GET["region"])) {
						$field = "region";
						$where = "and region='".$this->region_clean($_GET["region"])."'";
						$table = $this->table_hourly_region;
					}
				}
				
				break;
			case 3 : 
				$where = "and region = '".$_GET["region"]."'";
				$field = "kabupaten";	
				$table = $this->table_hourly_kabupaten; 
				break;
			case 4 : 
				$where = "and kabupaten = '".$_GET["kab"]."'";
				$field = "kecamatan";	
				$table = $this->table_hourly_kecamatan; 
				break;
			case 5 : 
				$where = "and kecamatan = '".$_GET["kec"]."'";
				$field = "desa";	
				$table = $this->table_hourly_desa; 
				break;
			default :
				$field = "area";
				$table = $this->table_hourly_area;
		}
		
		switch ($type) {
			case "latency" : $avg = "avg(avg_latency) latency"; break;
			case "packetloss" : $avg = "avg(avg_packetloss) packetloss"; break;
			case "gp" : $avg = "avg(game_parameter) gp"; break;
			case "signal" : $avg = "avg(avg_signalstrength) `signal`"; break;
			default : 
				$avg = "avg(avg_latency) latency"; break;
		}
		
		if (isset($_GET["date"]) && isset($_GET["hour"]))
			$where_periode = " and concat(date,hour) = '".$_GET["date"].$_GET["hour"]."'";
		else
			$where_periode = " and concat(date,hour) = (select concat(date,hour) from dashboard)";
			
			$query = "select 
						$field label,
						operator,
						$avg
					from 
						".$table." a
					where
						$field <> ''
						$where
						$where_periode
					group by 
						$field,
						operator";
		$data = $this->db->query($query)->getResultArray();
		
		return $data;
	}
	
	function two($n) {
		return (strlen($n) == 1 ? "0".$n : $n);
	}
	
	public function data($level,$type) {
		
		$where = "";
		
		switch ($type) {
			case "latency" : $field1 = "benchmark_latency"; break;
			case "packetloss" : $field1 = "benchmark_packetloss"; break;
			//case "signal" : $field1 = "signal_strength_classification"; break;
			case "gp" : $field1 = "benchmark_gp"; break;
			default : 
				$field1 = "benchmark_latency"; break;
		}
		switch ($level) {
			case 0 : 
				if ($type == "signal") {
					if (isset($_GET["map"]) && $_GET["map"] == "area") {
						$field = "area";	
						$table = $this->table_hourly_area; 
					} else if (isset($_GET["map"]) && $_GET["map"] == "treg") {
						$field = "treg";	
						$table = $this->table_hourly_treg; 
					} else if (isset($_GET["map"]) && $_GET["map"] == "region") {
						$field = "region";
						$table = $this->table_hourly_region; 
					} else if (isset($_GET["map"]) && $_GET["map"] == "kab") {
						$field = "kabupaten";
						$table = $this->table_hourly_kabupaten; 
					} else if (isset($_GET["map"]) && $_GET["map"] == "witel") {
						$field = "location";
						$table = $this->table_hourly_witel; 
					}
				} else {
					if (isset($_GET["map"]) && $_GET["map"] == "area") {
						$field = "area";	
						$table = $this->table_benchmark_area; 
					} else if (isset($_GET["map"]) && $_GET["map"] == "treg") {
						$field = "treg";	
						$table = $this->table_benchmark_treg;
					} else if (isset($_GET["map"]) && $_GET["map"] == "region") {
						$field = "region";	
						$table = $this->table_benchmark_region; 
					} else if (isset($_GET["map"]) && $_GET["map"] == "kab") {
						$field = "kabupaten";	
						$table = $this->table_benchmark_kabupaten; 
					} else if (isset($_GET["map"]) && $_GET["map"] == "witel") {
						$field = "location";
						$table = $this->table_benchmark_witel; 
					}
				}
				
				break;
			case 3 : 
			
				if (isset($_GET["area"]) && $_GET["area"] != "undefined")
					$where = " and area = '".$_GET["area"]."'";
				
				if (isset($_GET["region"]) && $_GET["region"] != "undefined")
					$where .= " and region = '".$_GET["region"]."'";
				
				if ($type == "signal") {
					$field = "kabupaten";	
					$table = $this->table_hourly_kabupaten; 
				} else {
					$field = "kabupaten";	
					$table = $this->table_benchmark_kabupaten; 
				}
				break;
			case 4 : 
				if (isset($_GET["area"]) && $_GET["area"] != "undefined")
					$where = " and area = '".$_GET["area"]."'";
				
				if (isset($_GET["region"]) && $_GET["region"] != "undefined")
					$where .= " and region = '".$_GET["region"]."'";
				
				if (isset($_GET["kab"]) && $_GET["kab"] != "undefined")
					$where .= " and kabupaten = '".$_GET["kab"]."'";
				
				if ($type == "signal") {
					$field = "kecamatan";	
					$table = $this->table_hourly_kecamatan; 
				} else {
					$field = "kecamatan";	
					$table = $this->table_benchmark_kecamatan; 
				}
				break;
			case 5 : 
				if (isset($_GET["area"]) && $_GET["area"] != "undefined")
					$where = " and area = '".$_GET["area"]."'";
				
				if (isset($_GET["region"]) && $_GET["region"] != "undefined")
					$where .= " and region = '".$_GET["region"]."'";
				
				if (isset($_GET["kab"]) && $_GET["kab"] != "undefined")
					$where .= " and kabupaten = '".$_GET["kab"]."'";
				
				if (isset($_GET["kec"]) && $_GET["kec"] != "undefined")
					$where .= " and kecamatan = '".$_GET["kec"]."'";
				
				if ($type == "signal") {
					$field = "desa";	
					$table = $this->table_hourly_desa; 
				} else {
					$field = "desa";	
					$table = $this->table_benchmark_desa; 
				}
				break;
			case 11 : 
				if (isset($_GET["area"]) && $_GET["area"] != "undefined")
					$where = " and area = '".$_GET["area"]."'";
				break;
			default :
				$field = "area";
				$table = $this->table_benchmark_area;
		}
		
		
		if ($type == "signal") {
			if (isset($_GET["date"]) && isset($_GET["hour"]))
				$where_periode = " and concat(date,hour) = '".$_GET["date"].$_GET["hour"]."'";
			else
				$where_periode = " and concat(date,hour) = (select concat(date,hour) from dashboard)";
			
			$query = "select 
							$field,
							a.signal_strength_classification label
						from 
							".$table." a
						WHERE
							signal_strength_classification IN ('excelent','good','fair','poor')
							and operator='Telkomsel'
							$where_periode
							$where
						group by 
							$field,
							signal_strength_classification";
		} else {
			if (isset($_GET["date"]) && isset($_GET["hour"]))
				$where_periode = " and date_format(datetime,'%Y-%m-%d %H') = '".$_GET["date"]." ".$this->two($_GET["hour"])."'";
			else
				$where_periode = " and date_format(datetime,'%Y-%m-%d') = (select `date` from dashboard) and date_format(datetime,'%H') = (select `hour` from dashboard)";
			
			$query = "select 
						$field,
						$field1 label
					from 
						".$table." a
					where
						$field1 in ('win','lose','par')
						$where_periode
						$where
					group by 
						$field,
						$field1";
		}
		
		//return array($query);
		#echo $query;
		$data = $this->db->query($query)->getResultArray();
		
		return $data;
	}
	
	public function hover($level) {
		switch ($level) {
			case 0 : 
				$where = "";
				if (isset($_GET["map"]) && $_GET["map"] == "area") {
					$table = $this->table_hourly_area; 
					$field = "area";
					//$where = "and area='".$_GET["area"]."'";
				} else if (isset($_GET["map"]) && $_GET["map"] == "treg") {
					$table = $this->table_hourly_region; 
					$field = "treg";
					//$where = "and treg='".$_GET["treg"]."'";
				} else if (isset($_GET["map"]) && $_GET["map"] == "region") {
					$table = $this->table_hourly_region; 
					$field = "region";
				} else if (isset($_GET["map"]) && $_GET["map"] == "kab") {
					$table = $this->table_hourly_kabupaten; 
					$field = "kabupaten";
					//$where = "and region='".$_GET["region"]."'";
				} else if (isset($_GET["map"]) && $_GET["map"] == "witel") {
					$table = $this->table_hourly_witel; 
					$field = "location";
					//$where = "and region='".$_GET["region"]."'";
				}
				break;
			case 3 : 
				$where = "and region = '".$_GET["region"]."'";
				$field = "kabupaten";
				$table = $this->table_hourly_kabupaten; 
				break;
			case 4 : 
				$where = "and kabupaten = '".$_GET["kab"]."'";
				$field = "kecamatan";	
				$table = $this->table_hourly_kecamatan; 
				break;
			case 5 : 
				$where = "and kecamatan = '".$_GET["kec"]."'";
				$field = "desa";
				$table = $this->table_hourly_desa; 
				break;
			default :
				$field = "area";
				$table = $this->table_hourly_area;
		}
		
		if (isset($_GET["date"]) && isset($_GET["hour"]))
			$where_periode = " and date = '".$_GET["date"].'" and hour='.$_GET["hour"]."'";
		else
			$where_periode = " and date = (select date from dashboard), hour = (select hour from dashboard)";
		//if (isset($_GET["date"]) && isset($_GET["hour"]))
		//	$where_periode = "concat(date,hour) = '".$_GET["date"].$_GET["hour"]."'";
		//else
		//	$where_periode = "concat(date,hour) = (select concat(date,hour) from dashboard)";
		
		$query = "select 
						$field label,
						operator,
						avg(avg_latency) latency,
						avg(avg_packetloss) packetloss,
						avg(game_parameter) gp,
						avg(avg_signalstrength) `signal`
					from 
						".$table."
					where
						operator = 'telkomsel'
						$where
						$where_periode
					group by 
						$field,
						operator";
		$data = $this->db->query($query)->getResultArray();
		
		return $data;
	}
	
	public function tabular($level) {
		switch ($level) {
			case 0 : 
				if (isset($_GET["area"])) {
					$table = $this->table_hourly_treg; 
					$field = "treg";
					$where = "and area='".$this->region_clean($_GET["area"])."'";
				} else if (isset($_GET["treg"])) {
					$table = $this->table_hourly_region; 
					$field = "region";
					$where = "and treg='".$this->region_clean($_GET["treg"])."'";
				} else if (isset($_GET["region"])) {
					$table = $this->table_hourly_region; 
					$field = "kabupaten";
					$where = "and region='".$this->region_clean($_GET["region"])."'";
				} else if (isset($_GET["region"])) {
					$table = $this->table_hourly_kabupaten; 
					$field = "region";
					$where = "and region='".$this->region_clean($_GET["region"])."'";
				} else if (isset($_GET["kab"])) {
					$field = "kabupaten";
					$where = "and kabupaten='".$this->region_clean($_GET["kab"])."'";
					$table = $this->table_hourly_kecamatan;
				} else if (isset($_GET["kec"])) {
					$field = "kecamatan";
					$where = "and kecamatan='".$this->region_clean($_GET["kec"])."'";
					$table = $this->table_hourly_desa;
				}  
				break;
			case 3 : 
				$table = $this->table_hourly_kabupaten; 
				$field = "kabupaten";
				$where = "and region='".$this->region_clean($_GET["region"])."'";
				break;
			case 4 : 
				$table = $this->table_hourly_kecamatan; 
				$field = "kecamatan";
				$where = "and kabupaten='".$_GET["kab"]."'";
				break;
			case 5 : 
				$field = "desa";
				$table = $this->table_hourly_desa; 
				$where = "and kecamatan='".$_GET["kec"]."'";
				break;
			default :
				$field = "area";
				$table = $this->table_hourly_area;
		}
		
		if (isset($_GET["date"]) && isset($_GET["hour"]))
			$where_periode = " and concat(date,hour) = '".$_GET["date"].$_GET["hour"]."'";
		else
			$where_periode = " and concat(date,hour) = (select concat(date,hour) from dashboard)";
		
		$query = "select 
						$field label,
						avg(avg_latency) avg_latency,
						avg(avg_packetloss) avg_packetloss,
						avg(game_parameter) game_parameter,
						avg(avg_signalstrength) avg_signalstrength,
						avg(avg_download_throughput) avg_download_throughput,
						avg(avg_upload_throughput) avg_upload_throughput, 
						operator
					from 
						".$table." a
					where
						$field <> ''
						$where
						$where_periode
					group by 
						$field,
						operator";
		$data = $this->db->query($query)->getResultArray();
		
		return $data;
		//return array($query);
	}
	
	public function twamp_telkomsel($field = "pl_status", $cnt = "count(1)") {
		
		$where = "";
		
		if (isset($_GET["area"]))
			$where .= "and area='".$this->region_clean($_GET["area"])."'";
		
		if (isset($_GET["treg"]))
			$where .= "and treg='".$this->region_clean($_GET["treg"])."'";
		
		if (isset($_GET["region"]))
			$where .= "and region='".$this->region_clean($_GET["region"])."'";
		
		if (isset($_GET["kab"]))
			$where .= "and kabupaten='".$this->region_clean($_GET["kab"])."'";
		
		if (isset($_GET["kec"]))
			$where .= "and kecamatan='".$this->region_clean($_GET["kec"])."'";
		
		if (isset($_GET["date"]))
			$where_periode = " and date = '".$_GET["date"]."'";
		else
			$where_periode = " and date = (select date from dashboard)";
		
		$table = $this->table_twamp_telkomsel; 
		$query = "select 
						$field,
						$cnt cnt
					from 
						".$table." a
					where
						1 = 1
						$where
						$where_periode
					group by 
						$field";
		$data = $this->db->query($query)->getResultArray();
		
		return $data;
	}
	
	public function brix_exfo() {
		
		$where = "";
		if (isset($_GET["treg"]))
			$where .= "and b.region_telkom='".$this->region_clean($_GET["treg"])."'";
		
		if (isset($_GET["region"]))
			$where .= "and b.region_tsel='".$this->region_clean($_GET["region"])."'";
		
		if (isset($_GET["date"]) && isset($_GET["hour"]))
			$where_periode = " and date_format(timestamp,'%Y-%m-%d') = '".$_GET["date"]."'";
		else
			$where_periode = " and date_format(timestamp,'%Y-%m-%d') = (select date from dashboard)";
		
		$query = "select 
						b.region_tsel,
						avg (a.percent_lost_packets) avg
					from 
						".$this->table_brix_exfo." a, 
						".$this->table_brix_hostname." b
					where 
						a.tipe = 'ebr'
						and a.host_name = b.ipoam
						$where_periode
						$where
					group by
						b.region_tsel";
		$data = $this->db->query($query)->getResultArray();
		
		return $data;
	}
	
	public function sla_core2internet() {
		$table = $this->table_sla_core2internet; 
		$query = "select 
						region_tsel,threshold_packet_loss 
					from 
						".$table."
					where
						year = date_format(now(),'%Y')";
		$data = $this->db->query($query)->getResultArray();
		return $data;
	}
	
	public function chart2($level) {
		switch ($level) {
			case 0 : 
				if (isset($_GET["area"])) {
					$table = $this->table_hourly_treg; 
					$field = "treg";
					$where = "and area='".$this->region_clean($_GET["area"])."'";
				} else if (isset($_GET["treg"])) {
					$table = $this->table_hourly_region; 
					$field = "region";
					$where = "and treg='".$this->region_clean($_GET["treg"])."'";
				} else if (isset($_GET["region"])) {
					$table = $this->table_hourly_kabupaten; 
					$field = "region";
					$where = "and region='".$this->region_clean($_GET["region"])."'";
				} else if (isset($_GET["kab"])) {
					$field = "kabupaten";
					$where = "and kabupaten='".$this->region_clean($_GET["kab"])."'";
					$table = $this->table_hourly_kecamatan;
				} else if (isset($_GET["kec"])) {
					$field = "kecamatan";
					$where = "and kecamatan='".$this->region_clean($_GET["kec"])."'";
					$table = $this->table_hourly_desa;
				}  
				break;
			case 3 : 
				$table = $this->table_hourly_kabupaten; 
				$field = "kabupaten";
				$where = "and region='".$this->region_clean($_GET["region"])."'";
				break;
			case 4 : 
				$table = $this->table_hourly_kecamatan; 
				$field = "kecamatan";
				$where = "and kabupaten='".$_GET["kab"]."'";
				break;
			case 5 : 
				$field = "desa";
				$table = $this->table_hourly_desa; 
				$where = "and kecamatan='".$_GET["kec"]."'";
				break;
			default :
				$field = "area";
				$table = $this->table_hourly_area;
		}
		
		if (isset($_GET["date"]) && isset($_GET["hour"]))
			$where_periode = " and date = '".$_GET["date"]."'";
		else
			$where_periode = " date = (select date from dashboard)";
		
		$query = "select 
						hour,
						operator,
						avg(avg_latency) latency,
						avg(avg_packetloss) packetloss
					from 
						".$table." a
					where
						$field <> ''
						$where
						$where_periode
					group by 
						hour,
						operator";
		$data = $this->db->query($query)->getResultArray();
		
		return $data;
	}
	
	public function tutela_hourly_periode() {
		$query = "select 
						max(date) date
					from 
						tutela_hourly_area_mart a";
		$data = $this->db->query($query)->getResultArray();
		$resp["date"] = ($data[0]["date"]?$data[0]["date"]:"");
		
		$query = "select 
						hour
					from 
						tutela_hourly_area_mart a
					where
						date = '".$resp["date"]."'
					group by hour
					having count(distinct area) = 4
					order by hour desc";
		$data = $this->db->query($query)->getResultArray();
		$resp["hour"] = $data[0]["hour"];
		
		return $resp;
	}
	
	public function etl_periode() {
		$query = "select transformation,date_format(period,'%d/%m/%Y %h:%i:%s') period from etl_periode";
		$data = $this->db->query($query)->getResultArray();
		
		return $data;
	}
	
	public function tutela_current_periode() {
		$query = "select 
						max(date) date
					from 
						tutela_hourly_area_mart a";
		$data = $this->db->query($query)->getResultArray();
		$resp["date"] = ($data[0]["date"]?$data[0]["date"]:"");
		
		$query = "select 
						max(hour) hour
					from 
						tutela_hourly_area_mart a
					where
						date = '".$resp["date"]."'";
		$data = $this->db->query($query)->getResultArray();
		$resp["hour"] = $data[0]["hour"];
		
		$query = "select 
						distinct area
					from 
						tutela_hourly_area_mart a
					where
						date = '".$resp["date"]."'
						and hour = ".$resp["hour"];
		$data = $this->db->query($query)->getResultArray();
		$resp["area"] = $data;
		
		return $resp;
	}
	
	public function tutela_current() {
		$query = "select 'tutela_hourly_area' label,count(1) count from tutela_hourly_area_mart
					union
					select 'tutela_hourly_area' label,count(1) count from tutela_hourly_area
					union
					select 'tutela_hourly_treg' label,count(1) count from tutela_hourly_treg
					union
					select 'tutela_hourly_region' label,count(1) count from tutela_hourly_region
					union
					select 'tutela_hourly_kabupaten' label,count(1) count from tutela_hourly_kabupaten
					union
					select 'tutela_hourly_kecamatan' label,count(1) count from tutela_hourly_kecamatan
					union
					select 'tutela_hourly_desa' label,count(1) count from tutela_hourly_desa";
		$data = $this->db->query($query)->getResultArray();
		
		return $data;
	}
	
	public function tutela_last_update() {
		$query = "select date_format(date,'%d/%m/%Y') date,hour from dashboard";
		$data = $this->db->query($query)->getResultArray();
		$resp["date"] = $data[0]["date"]." ".$data[0]["hour"].":00";
		
		return $resp;
	}
	
	public function dashboard_sync($data) {
		$query = "update ".$this->dashboard." 
					set 
						date = '".$data["date"]."',
						hour = '".$data["hour"]."'";
		$this->db->query($query);			
	}		
	
	public function latency_kota($mode = 1) {
		if ($mode == 1)
			$query = "SELECT region,kabupaten, ROUND(AVG(avg_latency),2)AS latency
						FROM tutela_hourly_kabupaten_mart
						WHERE operator='Telkomsel'
						AND date=(SELECT MAX(date) FROM tutela_hourly_kabupaten_mart)
						GROUP BY region,kabupaten";
		elseif ($mode == 2)
			$query = "SELECT region,kabupaten, ROUND(AVG(avg_packetloss),2)AS packetloss
						FROM tutela_hourly_kabupaten_mart
						WHERE operator='Telkomsel'
						AND date=(SELECT MAX(date) FROM tutela_hourly_kabupaten_mart)
						GROUP BY region,kabupaten";
		elseif ($mode == 3)
			$query = "SELECT a.REGION region, avg(a.latency) latency
							FROM 
								CTI_mart a
							WHERE 
								a.timestamp=(SELECT MAX(timestamp) FROM CTI_mart)
							GROUP BY region;";
		elseif ($mode == 4)
			$query = "SELECT a.REGION region, avg(a.packet_loss) packetloss
							FROM 
								CTI_mart a
							WHERE 
								a.timestamp=(SELECT MAX(timestamp) FROM CTI_mart)
							GROUP BY region;";
		
		$data = $this->db->query($query)->getResultArray();
		return $data;
	}
	
	public function latency_kota_before($mode = 1) {
		if ($mode == 1)
			$query = "SELECT region,kabupaten, ROUND(AVG(avg_latency),2) AS latency
						FROM tutela_hourly_kabupaten_mart
						WHERE operator='Telkomsel'
						AND date=(SELECT date_sub(MAX(date),interval 1 day) FROM tutela_hourly_kabupaten_mart)
						GROUP BY region,kabupaten;";
		elseif ($mode == 2)
			$query = "SELECT region,kabupaten, ROUND(AVG(avg_packetloss),2) AS packetloss
						FROM tutela_hourly_kabupaten_mart
						WHERE operator='Telkomsel'
						AND date=(SELECT date_sub(MAX(date),interval 1 day) FROM tutela_hourly_kabupaten_mart)
						GROUP BY region,kabupaten;";
		elseif ($mode == 3)
			$query = "SELECT a.REGION region, avg(a.latency) latency
							FROM 
								CTI_mart a
							WHERE 
								a.timestamp=(SELECT date_sub(MAX(timestamp),interval 1 DAY) FROM CTI_mart)
							GROUP BY region;";
		elseif ($mode == 4)
			$query = "SELECT a.REGION region, avg(a.packet_loss) packetloss
							FROM 
								CTI_mart a
							WHERE 
								a.timestamp=(SELECT date_sub(MAX(timestamp),interval 1 DAY) FROM CTI_mart)
							GROUP BY region;";
		
		$data = $this->db->query($query)->getResultArray();
		return $data;
	}
}
