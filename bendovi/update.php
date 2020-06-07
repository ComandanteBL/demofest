<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: index.php");
    exit;
}
?>

<?php
// Include config file
require_once "config.php";
 
// Define variables and initialize with empty values
$naziv = $grad = "";
$naziv_err = $grad_err = "";
 
// Processing form data when form is submitted
if(isset($_POST["id"]) && !empty($_POST["id"])){
    // Get hidden input value
    $id = $_POST["id"];
    
    // Validate naziv
    $input_naziv = trim($_POST["naziv"]);
    if(empty($input_naziv)){
        $naziv_err = "Molimo vas da unesete naziv.";
    } else{
        $naziv = $input_naziv;
    }
    
    // Validate grad
    $input_grad = trim($_POST["grad"]);
    if(empty($input_grad)){
        $grad_err = "Molimo vas da unesete grad.";
    } else{
        $grad = $input_grad;
    }
    
    // Check input errors before inserting in database
    if(empty($naziv_err) && empty($grad_err)){
        // Prepare an update statement
        $sql = "UPDATE bendovi SET naziv=?, grad=? WHERE id=?";
         
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "ssi", $param_naziv, $param_grad, $param_id);
            
            // Set parameters
            $param_naziv = $naziv;
            $param_grad = $grad;
            $param_id = $id;
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Records updated successfully. Redirect to landing page
                header("location: view.php");
                exit();
            } else{
                echo "Došlo je do greške. Molimo pokušajte kasnije.";
            }
        }
         
        // Close statement
        mysqli_stmt_close($stmt);
    }
    
    // Close connection
    mysqli_close($link);
} else{
    // Check existence of id parameter before processing further
    if(isset($_GET["id"]) && !empty(trim($_GET["id"]))){
        // Get URL parameter
        $id =  trim($_GET["id"]);
        
        // Prepare a select statement
        $sql = "SELECT * FROM bendovi WHERE id = ?";
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "i", $param_id);
            
            // Set parameters
            $param_id = $id;
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                $result = mysqli_stmt_get_result($stmt);
    
                if(mysqli_num_rows($result) == 1){
                    /* Fetch result row as an associative array. Since the result set
                    contains only one row, we don't need to use while loop */
                    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
                    
                    // Retrieve individual field value
                    $naziv = $row["naziv"];
                    $grad = $row["grad"];
                } else{
                    // URL doesn't contain valid id. Redirect to error page
                    header("location: error.php");
                    exit();
                }
                
            } else{
                echo "Ups! Došlo je do greške. Molimo pokušajte kasnije.";
            }
        }
        
        // Close statement
        mysqli_stmt_close($stmt);
        
        // Close connection
        mysqli_close($link);
    }  else{
        // URL doesn't contain id parameter. Redirect to error page
        header("location: error.php");
        exit();
    }
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Izmijeni unos</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        .wrapper{
            width: 500px;
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
                        <h2>Izmijeni unos</h2>
                    </div>
                    <p>Molim vas da unesete nove izmjene i da potvrdite na dugme sačuvaj.</p>
                    <form action="<?php echo htmlspecialchars(basename($_SERVER['REQUEST_URI'])); ?>" method="post">
                        <div class="form-group <?php echo (!empty($naziv_err)) ? 'has-error' : ''; ?>">
                            <label>Naziv</label>
                            <input type="text" name="naziv" class="form-control" value="<?php echo $naziv; ?>">
                            <span class="help-block"><?php echo $naziv_err;?></span>
                        </div>
                        <div class="form-group <?php echo (!empty($grad_err)) ? 'has-error' : ''; ?>">
                            <label>Grad</label>
                            <textarea name="grad" class="form-control"><?php echo $grad; ?></textarea>
                            <span class="help-block"><?php echo $grad_err;?></span>
                        </div>
                        <input type="hidden" name="id" value="<?php echo $id; ?>"/>
                        <input type="submit" class="btn btn-primary" value="Sačuvaj">
                        <a href="view.php" class="btn btn-default">Odustani</a>
                    </form>
                </div>
            </div>        
        </div>
    </div>
</body>
</html>