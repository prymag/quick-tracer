<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\People;
use Faker\Generator as Faker;

$factory->define(People::class, function (Faker $faker) {

    $gender = intval(rand(1, 2));
    $genderValue = $gender === 1 ? 'male' : 'female';
    $firstname = $faker->firstName($genderValue);

    return [
        'firstname' => $firstname,
        'lastname' => $faker->lastname,
        'middlename' => $faker->lastname,
        'email' => $faker->unique()->safeEmail,
        'gender' => $gender,
        'birthdate' => $faker->dateTimeThisCentury->format('Y-m-d')
    ];
});
