import { TestBed } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";
import { Location } from '@angular/common';


describe('HeroDetailComponent', () => {
    let fixture, mockActivatedRoute, mockHeroService, mockLocation;

    beforeEach(() => {
        mockActivatedRoute = {
            snapshot: { paraMap: { get: () => { return '3'; } } }
        }
        mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);
        TestBed.configureTestingModule({
            declarations: [HeroDetailComponent],
            providers: [
              {provider: ActivatedRoute, useValue: mockActivatedRoute},
              {provider: HeroService, useValue: mockHeroService},
              {provider: Location, useValue: mockLocation},
            ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);
    })
})