import { Component, Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";


@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

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
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
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

    //Triggering Events on Elements
    it(`should call heroService.deleteHero when the Hero Component's
        delete button is clicked using Triggering Events on Elements`,() => {
        spyOn(fixture.componentInstance, 'delete')
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        //run ngOninit
        fixture.detectChanges(); 

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponents[0].query(By.css('button'))
            .triggerEventHandler('click', {stopPropagation: () => {}});

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

        });

    //Emitting Events from Children
    it(`should call heroService.deleteHero when the Hero Component's
        delete button is clicked using Emitting events from children`,() => {
        spyOn(fixture.componentInstance, 'delete')
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        //run ngOninit
        fixture.detectChanges(); 

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        (<HeroComponent>heroComponents[1].componentInstance).delete.emit(undefined);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[1]);

        });

    it(`should call heroService.deleteHero when the Hero Component's
        delete button is clicked using Raising Events on Child directives`,() => {
        spyOn(fixture.componentInstance, 'delete')
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        //run ngOninit
        fixture.detectChanges(); 

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponents[2].triggerEventHandler('delete', null);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[2]);

        });  
        
    //Interacting with Input Boxes
    it('should add a new hero to the hero list when the add button is clicked', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        //run ngOninit
        fixture.detectChanges(); 
        const name = "Mr. Ice";
        mockHeroService.addHero.and.returnValue(of({id:5, name:name, strength:4}));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value = name;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();
        
        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

    });

    //Testing Router Link
    it('should have the correct route for the first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        //run ngOninit
        fixture.detectChanges();
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        let routerLink = heroComponents[0]
            .query(By.directive(RouterLinkDirectiveStub))
            .injector.get(RouterLinkDirectiveStub);
        
        heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

        expect(routerLink.navigatedTo).toBe('/detail/1');
    })


})