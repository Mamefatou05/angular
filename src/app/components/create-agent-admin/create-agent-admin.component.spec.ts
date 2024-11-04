import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAgentAdminComponent } from './create-agent-admin.component';

describe('CreateAgentAdminComponent', () => {
  let component: CreateAgentAdminComponent;
  let fixture: ComponentFixture<CreateAgentAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAgentAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAgentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
