<?php

if (strtoupper($_SERVER['REQUEST_METHOD']) === 'POST') {
	
	function curl_telemetry($query) {
		$credentials = base64_encode("CREDENTIALS");
		$headers = [];
		$headers[] = "Authorization: Basic {$credentials}";
		$headers[] = 'Content-Type: application/x-www-form-urlencoded';
		
		$ch = curl_init('http://host-influxdb/query?db=telemetry');
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($query));
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		return curl_exec($ch);
	}
	
	$db = new mysqli("HOST", "USER", "PASSWORD", "DB");
	
	if ($db -> connect_errno) {
		echo json_encode([status => 500, msg => $db -> connect_error]);
		exit();
	}
	
	$dt = json_decode(file_get_contents('php://input'));
	
	if (json_last_error() !== JSON_ERROR_NONE) {
		echo json_encode([status => 500, msg => json_last_error()]);
		exit();
	}
	
	if (!isset($dt->cmd)) {
		echo json_encode([status => 400, msg => 'cmd not set!']);
		exit();
	}
	
	header("Cache-Control: max-age=0, no-cache, must-revalidate, proxy-revalidate");
	
	switch ($dt->cmd) {
		
		case 'data' :
			
			$query = $db->query("SELECT `interface`, `ping` FROM bbone_path
				WHERE (`host`='$dt->host' AND `to`='$dt->to') OR (`host`='$dt->to' AND `to`='$dt->host')
				ORDER BY timestamp DESC LIMIT 1");
			
			$a = [ a => 'a'];
			if ($row = $query->fetch_assoc()) {
				$a['interface'] = $row['interface'];
				$a['ping'] = $row['ping'];
			}
			$query->free_result();
			$db->close();
			
			$b = json_decode(curl_telemetry(['q' => 'SELECT "time","bandwidth","line_state","data_rates/input_data_rate","data_rates/output_data_rate", "source","interface_statistics/full_interface_stats/crc_errors" FROM "Cisco-IOS-XR-pfi-im-cmd-oper:interfaces/interface-xr/interface_tcp" WHERE ("source" = \''.$dt->host.'\' or "source" = \''.$dt->to.'\') and "interface_name" = \''.$dt->iface.'\' ORDER BY time DESC LIMIT 1']))->results[0];
			if (isset($b->series[0]->values[0])) {
				$a['time'] = $b->series[0]->values[0][0];
				$a['bw'] = $b->series[0]->values[0][1]/1000000;
				$a['state'] = $b->series[0]->values[0][2];
				$a['rec'] = $b->series[0]->values[0][3]/1000000;
				$a['sent'] = $b->series[0]->values[0][4]/1000000;
				$a['src'] = $b->series[0]->values[0][5];
				
			}
			
			$b = json_decode(curl_telemetry(['q' => 'SELECT "time","interface_statistics/full_interface_stats/crc_errors" FROM "Cisco-IOS-XR-pfi-im-cmd-oper:interfaces/interface-xr/interface_tcp" WHERE "source" = \''.$dt->host.'\' and "interface_name" = \''.$dt->iface.'\' ORDER BY time DESC LIMIT 2']))->results[0];
			if (isset($b->series[0]->values[0]) && count($b->series[0]->values[0]) > 1) {
				$a['crc'] = $b->series[0]->values[0][1] - $b->series[0]->values[1][1];
			}
			
			$b = json_decode(curl_telemetry(['q' => 'SELECT "time","interface_statistics/full_interface_stats/crc_errors" FROM "Cisco-IOS-XR-pfi-im-cmd-oper:interfaces/interface-xr/interface_tcp" WHERE "source" = \''.$dt->to.'\' and "interface_name" = \''.$dt->iface.'\' ORDER BY time DESC LIMIT 2']))->results[0];
			if (isset($b->series[0]->values[0]) && count($b->series[0]->values[0]) > 1) {
				if ($a['crc'] < $b->series[0]->values[0][1] - $b->series[0]->values[1][1]) {
					$a['crc'] = $b->series[0]->values[0][1] - $b->series[0]->values[1][1];
				}
			}
			
			/*
			$b = json_decode(curl_telemetry(['q' => 'SELECT "time", "crc_errors" FROM  "Cisco-IOS-XR-infra-statsd-oper:infra-statistics/interfaces/interface/latest/generic-counters_tcp" WHERE "source" = \''.$dt->host.'\' and "interface_name" = \''.$dt->iface.'\' ORDER BY time DESC LIMIT 2']))->results[0];
			if (isset($b->series[0]->values[0]) && count($b->series[0]->values[0]) > 1) {
				$a['crc'] = $b->series[0]->values[0][1] - $b->series[0]->values[1][1];
			}
			
			$b = json_decode(curl_telemetry(['q' => 'SELECT "time", "crc_errors" FROM  "Cisco-IOS-XR-infra-statsd-oper:infra-statistics/interfaces/interface/latest/generic-counters_tcp" WHERE "source" = \''.$dt->host.'\' and "interface_name" = \''.$dt->iface.'\' ORDER BY time DESC LIMIT 2']))->results[0];
			if (isset($b->series[0]->values[0]) && count($b->series[0]->values[0]) > 1) {
				if ($a['crc'] < $b->series[0]->values[0][1] - $b->series[0]->values[1][1]) {
					$a['crc'] = $b->series[0]->values[0][1] - $b->series[0]->values[1][1];
				}
			}
			*/
			
			echo json_encode([status => 200, msg => $a ]);
			
			/*
			$b = json_decode(curl_telemetry(['q' => 'SELECT "time","bandwidth","line_state","source" FROM  "Cisco-IOS-XR-pfi-im-cmd-oper:interfaces/interface-xr/interface_tcp" WHERE ("source" = \''.$dt->host.'\' or "source" = \''.$dt->to.'\') and "interface_name" = \''.$dt->iface.'\' ORDER BY time DESC LIMIT 1']))->results[0];
			if (isset($b->series[0]->values[0])) {
				$a['time'] = $b->series[0]->values[0][0];
				$a['bw'] = $b->series[0]->values[0][1]/1000000;
				$a['state'] = $b->series[0]->values[0][2];
				$a['src'] = $b->series[0]->values[0][3];
			}
			
			$b = json_decode(curl_telemetry(['q' => 'SELECT "time", "crc_errors","bytes_received","bytes_sent", "source" FROM  "Cisco-IOS-XR-infra-statsd-oper:infra-statistics/interfaces/interface/latest/generic-counters_tcp" WHERE "source" = \''.$dt->host.'\' and "interface_name" = \''.$dt->iface.'\' ORDER BY time DESC LIMIT 2']))->results[0];
			$c = json_decode(curl_telemetry(['q' => 'SELECT "time", "crc_errors","bytes_received","bytes_sent", "source" FROM  "Cisco-IOS-XR-infra-statsd-oper:infra-statistics/interfaces/interface/latest/generic-counters_tcp" WHERE "source" = \''.$dt->to.'\' and "interface_name" = \''.$dt->iface.'\' ORDER BY time DESC LIMIT 2']))->results[0];
			
			echo json_encode([
				status => 200,
				msg => [
					a => $a,
					b => isset($b->series[0]->values) ? $b->series[0]->values : [],
					c => isset($c->series[0]->values) ? $c->series[0]->values : [],
					//'d' => isset($b->series[0]->columns) ? $b->series[0]->columns : [],
					//'e' => isset($c->series[0]->columns) ? $c->series[0]->columns : [],
				]
			]);
			*/
		break;
		
		case 'hst' :
			
			$query = $db->query("SELECT `interface`, `ping` FROM bbone_path
				WHERE (`host`='$dt->host' AND `to`='$dt->to') OR (`host`='$dt->to' AND `to`='$dt->host')
				ORDER BY timestamp DESC LIMIT 1");
			
			$a = [];
			while($row = $query->fetch_assoc()) { $a[] = $row; }
			$query->free_result();
			$db->close();
			
			$db = new mysqli("HOST", "USER", "PASSWORD", "DB");
			
			if ($db -> connect_errno) {
				
				echo json_encode([
					'status' => 200,
					'msg' => [
						'a' => $a,
					]
				]);
				
			} else {
				
				//$query = $db->query("SELECT source, traffic_in, traffic_out, bw, occu_in, occu_out 
				//	FROM `telemetri_generic-counters_tcp` 
				//	WHERE (source='" . $dt->host . "' OR source='" . $dt->to . "') AND interface_name='" . $dt->iface . "' 
				//	ORDER BY timestamp DESC LIMIT 1");
				
				$query = $db->query("SELECT source, MAX(bw)AS bw, MAX(traffic_in)AS ti, MAX(traffic_out)AS `to` 
					FROM `telemetri_generic-counters_tcp` 
					WHERE (source='$dt->host' OR source='$dt->to') AND interface_name='$dt->iface' 
					AND timestamp>DATE_SUB(CURDATE(), INTERVAL 30 DAY)
					GROUP BY source LIMIT 1");
				
				$b = [];
				while($row = $query->fetch_assoc()) { $b[] = $row; }
				$query->free_result();
				$db->close();
				
				echo json_encode([
					'status' => 200,
					'msg' => [
						'a' => $a,
						'b' => $b,
					]
				]);
				
			}
			
		break;
		
		case 'login' :
			if (!isset($dt->user) || $dt->user == '' ) {
				echo json_encode(array('status' => 200, 'msg' => 'error'));
			} else if (!isset($dt->password) || $dt->password == '' ) {
				echo json_encode(array('status' => 200, 'msg' => 'error'));
			} else if ($dt->user == 'user' && $dt->password == 'user') {
				echo json_encode(array('data' => array('count' => 2)));
			} else {
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL,"https://gis-auth.udata.id/telkom");
				curl_setopt($ch, CURLOPT_POST, 1);
				curl_setopt($ch, CURLOPT_POSTFIELDS, "key=inputyourkey&user=".$dt->user."&password=".$dt->password);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				echo curl_exec($ch);
			}
			
		break;
		
		case 'path' :
			$res = $db->query("SELECT `interface`, `ping` FROM bbone_path
				WHERE (`host`='$dt->host' AND `to`='$dt->to') OR (`host`='$dt->to' AND `to`='$dt->host')
				ORDER BY timestamp DESC LIMIT 1");
			
			$dt = [];
			while($row = $res->fetch_assoc()) {
				$dt[] = $row;
			}
			$res->free_result();
			$db->close();
			
			echo json_encode(array('status' => 200, 'msg' => $dt));
			
		break;
		
		case 'telemetri' :
			echo json_encode([
				'status' => 200,
				'msg' => [
					'a' => curl_telemetry(['q' => 'SELECT "time","description","bandwidth","line_state" FROM  "Cisco-IOS-XR-pfi-im-cmd-oper:interfaces/interface-xr/interface_tcp" WHERE time >= now() - 10m and time <= now() and "source" = \''.$dt->src.'\' and "interface_name" = \''.$dt->iface.'\' ORDER BY time DESC LIMIT 1']),
					'b' => curl_telemetry(['q' => 'SELECT "time", "packets_received","packets_sent","crc_errors","bytes_received","bytes_sent" FROM  "Cisco-IOS-XR-infra-statsd-oper:infra-statistics/interfaces/interface/latest/generic-counters_tcp" WHERE time >= now() - 10m and time <= now() and "source" = \''.$dt->src.'\' and "interface_name" = \''.$dt->iface.'\' ORDER BY time DESC LIMIT 1']),
				]
			]);
			
		break;
		
		default:
			echo json_encode(array('status' => 400, 'msg' => 'unknown cmd ' . $dt->cmd));
		break;
	}
	
} else {
	echo json_encode(array('status' => 400, 'msg' => 'Bad Request'));
}
?>