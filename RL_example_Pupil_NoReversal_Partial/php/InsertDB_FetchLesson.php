<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$pathToLesson = "/home/dec/www/dec_lnc2/stefanopalminteri/HernanAnllo/Hernan_server_tasks/RL_example_Pupil_NoReversal_Partial/Lessons/TEACH_WrittenLesson.csv";
$maxProcessCount = 1; // Maximum number of times a row can be processed
// Ensure the "Processed" column exists and select a row at random
function processCSV($pathToLesson, $maxProcessCount) {
    $rows = $headers = [];
    $selectedRow = null;
    if (($handle = fopen($pathToLesson, "r+")) !== FALSE) {
        // Attempt to acquire an exclusive lock on the file
        if (flock($handle, LOCK_EX)) {
            $rows = $headers = [];
            $selectedRow = null;

            // Read each row of the CSV into an array
            while ($row = fgetcsv($handle)) {
                $rows[] = $row;
            }

            // Retrieve and remove the header row
            $headers = array_shift($rows);

            // Check if the "Processed" column exists, add it if not
            if (!in_array('Processed', $headers)) {
                $headers[] = 'Processed';
            }

            // Pad each row with 'Processed' if necessary and combine with headers
            $data = array_map(function($row) use ($headers) {
                return array_combine($headers, array_pad($row, count($headers), '0'));
            }, $rows);

            // Filter rows that have not reached the maximum process count
            $eligibleRows = array_filter($data, function($row) use ($maxProcessCount) {
                return $row['Processed'] < $maxProcessCount;
            });

            // If there are eligible rows, select one at random and update its 'Processed' value
            if (!empty($eligibleRows)) {
                $selectedKey = array_rand($eligibleRows);
                $selectedRow = $eligibleRows[$selectedKey];

                // Increment the 'Processed' count for the selected row
                foreach ($data as &$row) {
                    if ($row['partID'] === $selectedRow['partID']) {
                        $row['Processed'] = (string)((int)$row['Processed'] + 1);
                        break;
                    }
                }
                unset($row); // Unset the reference to the last item

                // Truncate the file and write the updated data
                ftruncate($handle, 0);
                rewind($handle);
                fputcsv($handle, $headers);
                foreach ($data as $row) {
                    fputcsv($handle, $row);
                }
            } else {
                $selectedRow = ['WrittenLesson' => 'No eligible rows found', 'partID' => ''];
            }

            // Release the lock and close the file handle
            flock($handle, LOCK_UN);
            fclose($handle);

            // Return the selected row's data
            return [
                'Teacher_ID' => $selectedRow['partID'],
                'instructionText' => $selectedRow['WrittenLesson']
            ];
        } else {
            fclose($handle);
            return ['error' => 'Could not acquire file lock.'];
        }
    } else {
        return ['error' => 'Failed to open CSV file.'];
    }
}

$response = processCSV($pathToLesson, $maxProcessCount);
echo json_encode($response);
// ini_set('display_errors', 1);
// error_reporting(E_ALL);
?>