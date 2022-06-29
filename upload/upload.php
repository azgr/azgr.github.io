<?php
if(isset($_POST['submit'])) {
	$file=$_FILES['file'];
	
	$fileName=$_FILES['file']['name'];
	$fileTmpName=$_FILES['file']['tmp_name'];
	$fileSize=$_FILES['file']['size'];
	$fileError=$_FILES['file']['error'];
	$fileType=$_FILES['file']['type'];
	
	$fileExt=explode('.', $fileName);
	$fileActualExt=strtolower(end($fileExt));
	
	$allowed=array('jpg', 'jpeg', 'png', 'pdf', 'mod');
	if(in_array($fileActualExt, $allowed)){
		if($fileError===0){
			if($fileSize<10000000){
				//$x=0;
				//$fileNameNew='prog'.$x.".".$fileActualExt;
				//if(file_exists($fileNameNew)){
				//	$GLOBALS['x']=$GLOBALS['x']+1;
				//	$fileNameNew='prog'.$x.".".$fileActualExt;
				//}
				//za upload fajla kakav je originalno
				$fileNameNew=$fileName;
				//za upload fajla sa unikatnim imenom
				//$fileNameNew=uniqid('', true).".".$fileActualExt;
				$fileDestination='C:\Users\lenov\OneDrive - Masterwerk GmbH\Nova fascikla/'.$fileNameNew;
				move_uploaded_file($fileTmpName, $fileDestination);
				header("Location: index.html?uploadsuccess");
			} else {
				echo "Your file is too big!";
			}
		} else {
			echo "There was an error uploading your file!";
		}
	} else {
		echo "You cannot upload files of this type!";
	}

}