<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: index.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Error</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        .wrapper{
            width: 750px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="page-header">
                        <h1>Greška</h1>
                    </div>
                    <div class="alert alert-danger fade in">
                        <p>Žao nam je ali vaš zahtijev nije važeći. Molimo vas <a href="view.php" class="alert-link">idite nazad</a> i pokušajte ponovo.</p>
                    </div>
                </div>
            </div>        
        </div>
    </div>
</body>
</html>