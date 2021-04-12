<?php

namespace App\Classes;

class Tools
{
    public static function assignKey($arr, $key){
        $result = array();

        foreach($arr as $v){
            if(isset($v[$key])){
                $result[$v[$key]]=$v;
            }
        }
        return $result;
    }
    public static function arrayGroup($arr, $key){
        $arrRes = array();
        foreach($arr as $v){
            $arrRes[$v[$key]][]=$v;
        }
        return $arrRes;
    }



}
?>