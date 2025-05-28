<?php
//<?php declare(strict_types=1);
define("SIMPLEPI", 3.14);
echo SIMPLEPI;

$y = 10;
$ten = 10;

function addXto10(&$value){
    global $ten;
    echo $value + $ten;
    return __CLASS__;
}

if($y>11){
    echo "Greater than 11";
}elseif($y>9){
    echo "Greater than 9";
}

$printout = "Hello";
echo $printout;
echo strlen($printout);
$x = 5;

echo addXto10($x);
echo $x;

var_dump($x);


//1. Regular arrays
//2. Associative arrays
//3. Multidimensional arrays
//possible to have different types in the array

$cars = array("Volvo", "BMW", "Toyota");
print_r($cars);

//adding array elements to regular
$cars[]="Honda";
print_r($cars);

//adding multiple elements
array_push($cars, "Lamborghini", "Bugatti");
print_r($cars);

#removing elements from regular
array_splice($cars, 4, 2);
print_r($cars);

$cars2 = array("brand"=>"toyota", "model"=>"accord");
print_r($cars2);

//adding array elements to associative
$cars2["type"]="gasoline";
print_r($cars2);

//adding multiple elements to associative
$cars2 += ["cost"=>"luxury", "type"=>"used"];
print_r($cars2);


//SORTING
sort($cars);
rsort($cars);

ksort($cars2);
krsort($cars2);
asort($cars2);

?>