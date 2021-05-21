import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";


describe('HeroComponent (shallow tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;
  
    beforeEach(() => {
        HEROES = [
            {id:1, name: "Spyder", strength: 6},
            {id:2, name: "Bull", strength: 8},
            {id:3, name: "Lion", strength: 10},
        ]
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroesComponent);
        
    });

    it('should render each hero as a HeroComponent',() => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        //run ngOninit
        fixture.detectChanges(); 

        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent))
        expect(heroComponentDEs.length).toEqual(3);
        for(let i=0; i<heroComponentDEs.length; i++)
        {
            expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    });

    it(`should call heroService.deleteHero when the Hero Component's
        delete button is clicked`,() => {
        spyOn(fixture.componentInstance, 'delete')
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        //run ngOninit
        fixture.detectChanges(); 

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponents[0].query(By.css('button'))
            .triggerEventHandler('click', {stopPropagation: () => {}});

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

        })
})