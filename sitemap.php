<?php
$siteMap = simplexml_load_file('provided/sitemap.xml');
$data    = [];
foreach($siteMap as $el){
    if(isset($el->loc)){
        // echo 'Ajout de l\'url suivante : '.$el->loc. '<br>';
        array_push($data,$el->loc);
    }
}
echo json_encode($data);
?>