<?php

namespace App\Classes;

use App\Models\Module;

/**
 * Class Reply
 * @package App\Classes
 */
class Modules
{
    public static $roleModules;
    public static $packageData;
    public static $restrictionData;
    public static $roleData;
    public static $permissions = [];


    public static function PutPackageData($newData){
        self::$packageData = $newData;

    }
    public static function getPackageData(){
        return self::$packageData;
    }


    public static function PutRestrictionData($newData){
        self::$restrictionData = $newData;

    }
    public static function getRestrictionData(){
        return self::$restrictionData;
    }


    public static function PutRoleModules($newData){
        self::$roleModules = $newData;

    }
    public static function getRoleModules(){
        return self::$roleModules;

    }
    public static function premissions(){
        return self::$permissions;
    }
    public static function putPremissions($permissions){
        self::$permissions = $permissions;
    }

    public static function data($module){
        $moduleData = array();
        foreach($module as $v){
            $v['status'] = false;
            if(isset($v['subpermissions'])){
                $subPermissions = array();
                foreach($v['subpermissions'] as $s){
                    $subArr = array();
                    $subArr['title'] = $s['title'];
                    $subArr['name'] = $s['name'];
                    $subArr['status'] = false;
                    $subPermissions[]=$subArr;
                }
                usort($subPermissions, function($a, $b) {
                    return $a['title'] <=> $b['title'];
                });
                $v['subpermissions'] = $subPermissions;
            }else{
                $v['subpermissions'] = [];
            }
            $moduleData[]=$v;
        }
        usort($moduleData, function($a, $b) {
            return $a['title'] <=> $b['title'];
        });
        return $moduleData;
    }  




}