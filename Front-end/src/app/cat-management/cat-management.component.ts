import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Cat } from '../_entity/cat';
import { Router } from '@angular/router';
import { ModServiceService } from '../_service/mod_service/mod-service.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Role } from '../_entity/role';
import { UserService } from '../_service/user_service/user.service';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-cat-management',
  templateUrl: './cat-management.component.html',
  styleUrls: ['./cat-management.component.css']
})
export class CatManagementComponent implements OnInit {
  cat: Cat;
  catList: Cat[];
  error: string;
  email: string;
  role: Role;
  rolesofUser: Role[];
  isMod: boolean = false;
  isClick: boolean = false;
  isCreate: boolean = false;
  sCatname: string = "";
  dataTable: any;

  constructor(private fb: FormBuilder, private router: Router, private modService: ModServiceService, private userService: UserService, private chRef: ChangeDetectorRef) {
    this.cat = new Cat()
  }

  ngOnInit() {
    this.checkEmail();
    this.getCatList();
  }

  getCatList() {
    this.modService.getAllCat()
      .subscribe(res => {
        this.catList = res.data;
        if (res.success == "true") {

          this.catList = res.data;

          this.chRef.detectChanges();

          // Now you can use jQuery DataTables :
          const table: any = $('table');
          this.dataTable = table.DataTable();

          for (let cat of this.catList) {
            if (cat.checkCat == 1) {
              cat.isCheck = true
            }
            else {
              cat.isCheck = false
            }
            for(let cat1 of this.catList)
            {
              if(cat.parentId == cat1.id)
              {
                cat.parentName = cat1.name                
              }
            }
          }


        }
      }, err => {
        console.log(err.message)
      });
  }

  onGotoCatEdit(id) {
    this.isClick = true;
    for (let cat1 of this.catList) {
      if (cat1.id == id) {
        this.cat = cat1;
        this.sCatname = cat1.name;
      }
    }

  }

  updateCat() {
    if (this.isClick == false) {
      alert("Chưa chọn danh mục cần cập nhật !!!");
    }
    else {
      this.email = localStorage.getItem("email")
      this.cat.dateUpdated = new Date();
      this.cat.userUpdated = this.email;
      this.cat.name = this.sCatname;
      this.modService.updateCat(this.cat).pipe(first()).subscribe(res => {
        if (res.success == "true") {
          alert("Cập nhật danh mục thành công !!!");
          this.error = "";
        }
        else {
          alert("Cập nhật danh mục không thành công !!!");
        }
        this.getCatList();
      },
        err => {
          this.error = err.message
        })
    }
  }

  checkEmail() {
    this.email = localStorage.getItem("email")
    if (this.email == null) {
      // this.router.navigate(["/"])
      window.location.href = "/";
    }
    this.userService.getProfile(this.email)
      .pipe(first())
      .subscribe(res => {
        if (res.success == "true") {
          this.rolesofUser = res.data.roles
          for (let role of this.rolesofUser) {
            if ((role.p_delete == true || role.p_update == true || role.p_approve == true) && (role.status == 1)) {
              this.isMod = true
            }
            if (role.p_create == true && (role.status == 1)) {
              this.isCreate = true
            }

            if (role.p_admin == true && (role.status == 1)) {
              this.isMod = true
            }
          }
          if (this.isMod == false) {
            alert("Bạn không được truy cập vào trang này")
            // this.router.navigate(["/"])
            window.location.href = "/";
          }
        }
        else {
          this.error = res.message
        }
      }, err => {
        console.log(err)
      })
  }

  toggleCatStatus(e) {
    this.email = localStorage.getItem("email")
    this.modService.updateStatusCat(e.target.value, this.email)
      .subscribe(res => {
        if (res.success == "true") {
          console.log("Update thành công")
        }
        else {
          console.log("Update không thành công")
        }
      }, err => {
        console.log(err);
      });
  }

}
