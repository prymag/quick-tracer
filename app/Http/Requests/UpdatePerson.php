<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;

class UpdatePerson extends StorePerson
{
    public function rules()
    {
        $rules = parent::rules();

        $rules['email'] = [
            'required',
            'email',
            Rule::unique('people')->ignore($this->person),
        ];

        return $rules;
    }
}
