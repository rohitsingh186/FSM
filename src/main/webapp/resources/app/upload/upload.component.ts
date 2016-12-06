import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UploadService} from "./upload.service";
import {Country} from "../region/country/country";
import {City} from "../region/city/city";
import {Location} from "../region/location/location";
import {Level} from "../region/level/level";

@Component({
    moduleId: module.id,
    selector: 'upload',
    templateUrl: 'upload.component.html'
})

@Injectable()
export class UploadComponent implements OnInit{
    form: FormGroup;
    submitAttempt:boolean =false ;
    countries:Country[] ;
    cities:City[] ;
    locations:Location[] ;
    levels:Level[] ;

    constructor(formBuilder: FormBuilder, private uploadService:UploadService) {
        console.log("I am constructed") ;
        this.form = formBuilder.group({
            'country':['',Validators.required],
            'city':['',Validators.required],
            'location':['',Validators.required],
            'floor':['',Validators.required],
            'upload':['',Validators.required]
        });
    }

    ngOnInit(){
        this.getCountries() ;
    }
<<<<<<< HEAD:src/main/webapp/angular-fms/app/upload/upload.component.ts
    getCities(){
        console.log("Id of  selected country") ;
        // this.uploadService.getCities().subscribe((cities)=> {
        //     this.cities = cities;
        //     for (var i = 0; i < this.cities.length; i++) {
        //         // console.log("Countries are:" + cities[i].name);
        //         this.cities[i].locations = null;
        //
        //     }
        // });
=======

    getCountries() {
        this.uploadService.getCountries().subscribe((countries)=> {
            this.countries = countries;
            for (var i = 0; i < this.countries.length; i++) {
                console.log("Countries are:" + countries[i].name);
                this.countries[i].cities = null;
            }
        });
    }

    getCities(countryName) {
        console.log("Country selected successfully"+countryName) ;
        this.uploadService.getCities().subscribe((cities)=> {
            this.cities = cities;
            for (var i = 0; i < this.cities.length; i++) {
                console.log("Countries are:" + cities[i].name);
                this.cities[i].locations = null;
            }
        });
>>>>>>> 01b203acbe926f0a6af3a8d636bf00c13f440c3b:src/main/webapp/resources/app/upload/upload.component.ts
    }

    getLocations(cityName) {
        this.uploadService.getLocations().subscribe((locations)=> {
            this.locations = locations;
            for (var i = 0; i < this.locations.length; i++) {
                // console.log("Countries are:" + locations[i].name);
                this.locations[i].levels = null;
            }
        });
    }

    getLevels(locationName) {
        this.uploadService.getLocations().subscribe((levels)=> {
            this.levels = levels;
            for (var i = 0; i < this.levels.length; i++) {
<<<<<<< HEAD:src/main/webapp/angular-fms/app/upload/upload.component.ts
                // console.log("Countries are:" + levels[i].name);


=======
                console.log("Countries are:" + levels[i].name);
>>>>>>> 01b203acbe926f0a6af3a8d636bf00c13f440c3b:src/main/webapp/resources/app/upload/upload.component.ts
            }
        });
    }

    changeListener($event): void {
        this.uploadService.changeListener($event) ;
    }

    onSubmit(formGroup: FormGroup): void {
        this.submitAttempt=true ;
<<<<<<< HEAD:src/main/webapp/angular-fms/app/upload/upload.component.ts
        // console.log(JSON.stringify(value.value))
        this.uploadService.acceptFormData(value) ;
        /*subscribe((layoutData)=> {
            this.utilService.calculateGridSize(layoutData);
            this.layoutService.loadLayoutData(layoutData);
        });*/
    }

getCountries(){
    this.uploadService.getCountries().subscribe((countries)=> {
        this.countries = countries;
        for (var i = 0; i < this.countries.length; i++) {
             console.log("in uploadcomponent Countries are:" + countries[i].name);
            this.countries[i].cities = null;

        }
    });
}
    ngOnInit(){
       this.getCountries() ;
    }
=======
        console.log(JSON.stringify(formGroup.value))
        this.uploadService.acceptFormData(formGroup) ;
    }
>>>>>>> 01b203acbe926f0a6af3a8d636bf00c13f440c3b:src/main/webapp/resources/app/upload/upload.component.ts
}