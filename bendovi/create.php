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
if($_SERVER["REQUEST_METHOD"] == "POST"){
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
        // Prepare an insert statement
        $sql = "INSERT INTO bendovi (naziv, grad) VALUES (?, ?)";
         
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "ss", $param_naziv, $param_grad);
            
            // Set parameters
            $param_naziv = $naziv;
            $param_grad = $grad;
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Records created successfully. Redirect to landing page
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
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dodaj bend</title>
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
                        <h2>Dodaj bend</h2>
                    </div>
                    <p>Molimo vas da popunite formu i da kliknete na dugme sačuvaj.</p>
                    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
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
                        <input type="submit" class="btn btn-primary" value="Sačuvaj">
                        <a href="view.php" class="btn btn-default">Odustani</a>
                    </form>
                </div>
            </div>        
        </div>
    </div>
</body>
</html>