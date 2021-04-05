import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatTabsModule, MatGridListModule, MatSelectModule, MatToolbarModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule, 
        MatInputModule, 
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatTabsModule,
        MatGridListModule,
        MatSelectModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatTabsModule,
        MatGridListModule,
        MatSelectModule,
        MatToolbarModule,
        MatTableModule,        
        MatPaginatorModule,
        MatSortModule
    ]
})
export class MaterialModule {}