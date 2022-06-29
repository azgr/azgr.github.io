<form method="POST" action="upload.php" enctype="multipart/form-data">
    <input type="file" name="file">
    <input type="submit" value="Upload">
</form>

<?php

$files = scandir("uploads");
for ($a = 2; $a < count($files); $a++)
{
    ?>
    <p>
        <?php echo $files[$a]; ?>

        <a href="uploads/<?php echo $files[$a]; ?>" download="<?php echo $files[$a]; ?>">
            Download
        </a>

        <a href="delete.php?name=uploads/<?php echo $files[$a]; ?>" style="color: red;">
            Delete
        </a>
    </p>
    <?php
}

?>

<style>
    .fixed-bottom {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: lightseagreen;
        color: white;
        text-align: center;
        padding: 25px;
        font-size: 20px;
    }
</style>

<div class="footer fixed-bottom">
    Get an image sharing web app in Node JS and Mongo DB for just <b>$20</b>. <a style="color: greenyellow;" href="https://adnan-tech.com/image-sharing-app-in-node-js/">Get here</a>
</div>
