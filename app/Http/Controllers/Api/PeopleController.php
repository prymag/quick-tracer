<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePerson;
use App\Http\Requests\UpdatePerson;
use App\Models\People;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PeopleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new ResourceCollection(People::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePerson $request)
    {
        $people = People::create($request->all());

        return JsonResource::make($people);
    }

    /**
     * Display the specified resource.
     *
     * @param  People  $people
     * @return \Illuminate\Http\Response
     */
    public function show(People $person)
    {
        return JsonResource::make($person);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePerson $request, People $person)
    {
        $person->update($request->all());

        return JsonResource::make($person);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  People  $person
     * @return \Illuminate\Http\Response
     */
    public function destroy(People $person)
    {
        $person->delete();
    }
}
