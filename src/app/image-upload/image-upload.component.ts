import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as getPixels from 'get-pixels';



class ImageSnippet{
  constructor(public src: string, public file: File){}
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  
  
  private ctx: CanvasRenderingContext2D;

  constructor() { }
  

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }
  selectedFile: ImageSnippet;

  processFile(imageInput : any){
    const file: File= imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any)=>{
      this.selectedFile = new ImageSnippet(event.target.result, file);
      var img = new Image()
      var ctx = this.canvas.nativeElement.getContext('2d');
      img.onload = function(){
        ctx.clearRect(0, 0, 10000, 10000);
        ctx.drawImage(img,0,0)
        var imageData = ctx.getImageData(0, 0, img.width, img.height);
        console.log(imageData);
        var data = imageData.data
        var areaReal = 0
        var negro = 0
        var total = 0
        var area = 0
        const ARRAY_LENGTH = data.length/4
        const binaryArray = []
        for(let i = 0; i<ARRAY_LENGTH; i++) {
          binaryArray.push(Math.random()>=0.2 ? 1 : 0)
          //binaryArray.push(1)
        }
        for (var i = 0; i < data.length; i += 4) {
          if(binaryArray[i/4]=== 1){
            total++;
            if(data[i]=== 0){
              negro++;
            }
          }
          if(data[i]=== 0){
            areaReal++;
          }
        }
        
        console.log("ni =" + negro)
        console.log("n =" + total)
        console.log("Area real = " + areaReal)
        area = (negro/total)*(imageData.width)*(imageData.height)
        console.log("Area estimada = "+area)


      }
      img.src = this.selectedFile.src

    });

    reader.readAsDataURL(file);

    

  }

}
