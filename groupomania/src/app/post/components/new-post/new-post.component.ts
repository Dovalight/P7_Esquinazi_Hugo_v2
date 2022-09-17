import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { post } from '../../../core/models/Post.model';
import { PostService } from '../../../core/services/post-service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  postForm!: FormGroup
  postPreview$!: Observable<post>;
  urlRegex!: RegExp;
  image: string = '';
  file: any;

  constructor(private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router) { }

  ngOnInit(): void {
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.postForm = this.formBuilder.group({
      name:[null, Validators.required],
      post: [null, Validators.required],
      imageUrl: [null, Validators.pattern(this.urlRegex)]
    }, {
      updateOn: 'blur'
    });
    this.postPreview$ = this.postForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        likes: 0 ,
        dislikes: 0
      }))
    );
  }

  onChangeFile(event:any): void{
    let files = Array.from(event.target.files);
    this.file = files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = ()=> {
      this.image = reader.result?.toString()??'';
    };
  }

  onSubmitForm(): void{
    this.postService.addPost(this.postForm.value).subscribe((result)=>{
      console.log(result);
      this.router.navigateByUrl('/groupo');
    },
    (error)=> {
      console.log(error);
    });
  }

}
