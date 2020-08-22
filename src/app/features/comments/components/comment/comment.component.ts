import { Component, Input, OnInit } from '@angular/core';
import { EventComment } from '../../models/eventComment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass'],
})
export class CommentComponent implements OnInit {
  @Input() comment: EventComment;

  constructor() {}

  ngOnInit(): void {
    if (!this.comment) {
      throw new Error('comment not initialized');
    }
  }
}
