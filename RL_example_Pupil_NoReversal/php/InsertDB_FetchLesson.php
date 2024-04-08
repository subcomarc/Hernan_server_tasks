<?php
header('Content-Type: application/json');
$pathToLesson = "Lessons/TEACH_WrittenLesson.csv";
$maxProcessCount = 1; // Maximum number of times a row can be processed
// Ensure the "Processed" column exists and select a row at random
function processCSV($pathToLesson, $maxProcessCount) {
    $rows = $headers = [];
    $selectedRow = null;
    if (($handle = fopen($pathToLesson, "r+")) !== FALSE) {
        if (flock($handle, LOCK_EX)) {
            while ($row = fgetcsv($handle)) {
                $rows[] = $row;
            }
            fclose($handle);

            $headers = array_shift($rows); // Remove and save header row
            if (!in_array('Processed', $headers)) {
                $headers[] = 'Processed'; // Add "Processed" column
            }

            $data = array_map(function($row) use ($headers) {
                return array_combine($headers, array_pad($row, count($headers), '0')); // Pad row with '0' for "Processed"
            }, $rows);

            $eligibleRows = array_filter($data, function($row) use ($maxProcessCount) {
                return $row['Processed'] < $maxProcessCount;
            });

            if (!empty($eligibleRows)) {
                $randomKeys = array_rand($eligibleRows);
                $selectedRow = $eligibleRows[$randomKeys];
                foreach ($data as &$row) {
                    if ($row['partID'] === $selectedRow['partID']) {
                        $row['Processed'] = (string)($maxProcessCount); // Update "Processed"
                        break;
                    }
                }

                // Write back to the file
                $handle = fopen($pathToLesson, "w");
                fputcsv($handle, $headers);
                foreach ($data as $row) {
                    fputcsv($handle, array_values($row));
                }
                flock($handle, LOCK_UN);
                fclose($handle);
            } else {
                return ['error' => 'No eligible rows found.'];
            }
        } else {
            fclose($handle);
            return ['error' => 'Could not acquire file lock.'];
        }
    } else {
        return ['error' => 'Failed to open CSV file.'];
    }

    // Return formatted instruction and teacher ID
    return [
        'instructionText' => htmlspecialchars($selectedRow['WrittenLesson'], ENT_QUOTES, 'UTF-8'),
        'Teacher_ID' => $selectedRow['partID']
    ];
}
$response = processCSV($pathToLesson, $maxProcessCount);
echo json_encode($response);
ini_set('display_errors', 1);
error_reporting(E_ALL);
?>