import { Component, OnInit, inject } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons'
import { takeUntil } from 'rxjs'
import { Document } from 'src/app/data/document'
import { PermissionsService } from 'src/app/services/permissions.service'
import { DocumentService } from 'src/app/services/rest/document.service'
import { ConfirmDialogComponent } from '../confirm-dialog.component'

@Component({
  selector: 'pngx-append-confirm-dialog',
  templateUrl: './append-confirm-dialog.component.html',
  styleUrl: './append-confirm-dialog.component.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxBootstrapIconsModule,
  ],
})
export class AppendConfirmDialogComponent
  extends ConfirmDialogComponent
  implements OnInit
{
  private documentService = inject(DocumentService)
  private permissionService = inject(PermissionsService)

  public documentIDs: number[] = []
  public archiveFallback: boolean = false
  public deleteOriginals: boolean = false
  private _documents: Document[] = []
  get documents(): Document[] {
    return this._documents
  }

  public targetDocumentID: number = -1

  constructor() {
    super()
  }

  ngOnInit() {
    this.documentService
      .getFew(this.documentIDs)
      .pipe(takeUntil(this.unsubscribeNotifier))
      .subscribe((r) => {
        this._documents = r.results
        // Default to first document as target
        if (this.documentIDs.length > 0) {
          this.targetDocumentID = this.documentIDs[0]
        }
      })
  }

  getDocument(documentID: number): Document {
    return this.documents.find((d) => d.id === documentID)
  }

  get sourceDocuments(): Document[] {
    return this.documents.filter((d) => d.id !== this.targetDocumentID)
  }

  get targetDocument(): Document | undefined {
    return this.documents.find((d) => d.id === this.targetDocumentID)
  }

  get userOwnsAllDocuments(): boolean {
    return this.documents.every((d) =>
      this.permissionService.currentUserOwnsObject(d)
    )
  }
}