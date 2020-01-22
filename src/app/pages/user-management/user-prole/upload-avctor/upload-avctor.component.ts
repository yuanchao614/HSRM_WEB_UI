import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from '../../user-management.service';

@Component({
  selector: 'app-upload-avctor',
  templateUrl: './upload-avctor.component.html',
  styleUrls: ['./upload-avctor.component.css']
})
export class UploadAvctorComponent implements OnInit {

  @Input() uploadAvctorIsVisible: boolean;
  @Input() clickTrData: any;
  @Output() closeModal = new EventEmitter();
  // 上传图片信息
  imgFile = {
    imgSize: null,
    imgName: null,
    imgData: null,
    imgBase64: null
  };
  imgUrl: any;
  fileRoute: any;
  imgVisible = false;
  uploadDisable = true;
  clickLoding = false;

  constructor(
    private message: NzMessageService,
    private userService: UserService
  ) { }

  ngOnInit() {
    console.log(this.clickTrData);
    // this.showRecept();
    this.initAvctor();
  }

  initAvctor() {
    if (this.clickTrData.avatar) {
      this.imgFile.imgBase64 = this.clickTrData.avatar;
      this.imgVisible = true;
    }
  }

  handleCancelMiddle(): void {
    console.log('click cancel');
    this.uploadAvctorIsVisible = false;
    this.closeModal.emit();
  }

  handleOkMiddle(): void {
    console.log('click OK');
    this.uploadAvctorIsVisible = false;
    this.closeModal.emit();
  }

  // beforeUpload(e) {
  //   this.imgFile.imgData = new FormData();
  //   const file = e.srcElement.files[0]; // 获取上传Excel的file对象
  //   const isImage = file.type.includes('image');
  //   if (isImage) {
  //     this.imgFile.imgName = file.name;
  //     this.imgFile.imgData.append('files', file);
  //   } else {
  //     this.message.create('warning', `请上传图片！`);
  //   }
  // }

  getBase64(file: File) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const base64Str = reader.result.toString();
      this.imgFile.imgBase64 = base64Str.split('base64,')[1]; // 获取上传图片的base64码
    });
    reader.readAsDataURL(file);
  }

  beforeUpload(e) {
    const file = e.srcElement.files[0]; // 获取上传图片的file对象
    console.log(file);
    this.imgFile.imgSize = file.size;
    const isImage = file.type.includes('image');
    if (isImage && this.imgFile.imgSize < 10000) {
      this.imgVisible = true;
      this.uploadDisable = false;
      this.imgFile.imgName = file.name;
      this.getBase64(file);
    } else {
      this.message.create('warning', `上传的不是图片或者图片过大！`);
    }
    // this.getBase64(file);
    // console.log(file);
    // this.checkImageSize(file);
  }

  uploadImg() {
    const param = {
      username: this.clickTrData.username,
      avatar: this.imgFile.imgBase64
    };
    this.userService.uploadImg(param).subscribe(r => {
      console.log(r);
      if (r.code === 100001) {
        this.message.create('success', `${r.msg}`);
        this.handleOkMiddle();
      }
    });
  }

  getUploadReceiptFileRoute() {
    // this.clickLoding = true;
    // const param = {
    //   files: this.imgFile.imgData
    // };
    // this.imgFile.imgData ?
    //   this.publicService.importFile(param).subscribe(r => {
    //     console.log(r);
    //     if (r.code === 10000001) {
    //       this.fileRoute = r.msg;
    //       this.uploadDisable = false;
    //       this.clickLoding = false;
    //       this.message.create('success', `上传图片成功！`);
    //       this.showRecept();
    //     }
    //   }) : this.message.create('warning', `请先选择要上传的图片！`);
  }

  uploadReceipt() {
    // const tenantId = localStorage.getItem('tenant_id');
    // const editParam = {
    //   feeTicketEntity: {
    //     customerId: this.checkedTrData.customerId,
    //     fileRoute: this.fileRoute,
    //     id: this.checkedTrData.tid,
    //     periodId: this.checkedTrData.id,
    //     projectCode: this.checkedTrData.projectCode,
    //     ticketFee: this.checkedTrData.ticketFee,
    //     ticketTime: this.checkedTrData.ticketTime,
    //     tenantId: this.checkedTrData.tenantId,
    //   }
    // };
    // const addParam = {
    //   feeTicketEntity: {
    //     customerId: this.checkedTrData.customerId,
    //     fileRoute: this.fileRoute,
    //     // id: this.checkedTrData.tid,
    //     periodId: this.checkedTrData.id,
    //     projectCode: this.checkedTrData.projectCode,
    //     tenantId
    //   }
    // };
    // const param = this.checkedTrData.tid ? editParam : addParam;
    // console.log(JSON.stringify(param));
    // this.fileRoute ?
    //   this.refundManagementService.invoiceInfo(param).subscribe(r => {
    //     console.log(r);
    //     if (r.code === 10004004) {
    //       this.message.create('success', `上传凭证成功！`);
    //       this.handleOkMiddle();
    //     }
    //   }) : this.message.create('warning', `请先上传图片！`);
  }

}
