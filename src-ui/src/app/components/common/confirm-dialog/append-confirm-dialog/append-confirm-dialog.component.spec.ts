import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppendConfirmDialogComponent } from './append-confirm-dialog.component'

describe('AppendConfirmDialogComponent', () => {
  let component: AppendConfirmDialogComponent
  let fixture: ComponentFixture<AppendConfirmDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppendConfirmDialogComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AppendConfirmDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})