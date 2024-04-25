<p>
    <?php
    $ip = $_SERVER["REMOTE_ADDR"];
    $hqdn = $_SERVER["REMOTE_PORT"];
    $os = $_SERVER["HTTP_USER_AGENT"];

    echo "IP <b id='ip'>" . $ip . "</b> | ";
    echo "PORT <b id='hqdn'>" . $hqdn . "</b><br/>";
    echo "<small id='os'>" . $os . "</small>";
    ?>
</p>
<p>
    <small>Click "Enter Here" to submit your emotions here.</small>
</p>