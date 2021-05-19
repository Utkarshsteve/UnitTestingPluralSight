import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent',() => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            {id:1, name: 'SpiderDude', strength: 8},
            {id:2, name: 'Wonder', strength: 10},
            {id:3, name: 'SuperDude', strength: 15},
        ]

        mockHeroService = jasmine.createSpyObj(['getHero', 
                                                'addHero', 'deleteHero']); //creates mock object
        component = new HeroesComponent(mockHeroService);  
    })

    describe('delete', () => {

        it('should remove the indicated hero from the heroes list', () => {
            mockHeroService.deleteHero.and.returnValue(of(true))
            component.heroes = HEROES;

            component.delete(HEROES[1]);

            expect(component.heroes.length).toBe(2);
        })

        it('should call deleteHero', () => {
            mockHeroService.deleteHero.and.returnValue(of(true))
            component.heroes = HEROES;

            component.delete(HEROES[1]);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[1]);
        })
    })

})