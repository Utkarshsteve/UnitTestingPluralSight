import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroComponent } from "./hero.component";

describe('HeroComponent (shallow tests)', () => {
    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent);
    })


    it('should have the correct hero', () => {
        fixture.componentInstance.hero = { id:1, name: 'SuperMan', strength: 10};
    
        expect(fixture.componentInstance.hero.name).toEqual('SuperMan');
    });

    it('should render the hero name in an anchor tah', () => {
        fixture.componentInstance.hero = { id:1, name: 'SuperMan', strength: 10};
        fixture.detectChanges();
    
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperMan');
    });
})