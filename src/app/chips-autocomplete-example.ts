import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Component, ElementRef, HostListener, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { HighlightTag } from 'angular-text-input-highlight';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'chips-autocomplete-example',
  templateUrl: 'chips-autocomplete-example.html',
  styleUrls: ['chips-autocomplete-example.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChipsAutocompleteExample {
  @ViewChild('textarea') textarea: ElementRef
  PersonControl = new FormControl();
  filteredPersons: Observable<string[]>;

  allPersons: string[] = [
    'Gina Williams',
    'Jake Williams',
    'Jamie John',
    'John Doe',
    'Jeff Stewart',
    'Paula M. Keith'
  ];
current: any;
  tags:  HighlightTag[] = [];
  tagClicked: HighlightTag;
  mention: any;
  text: string = 'Hello @mattlewis92 how are you today?\n\nLook I have a #different background color!\n\n@angular is pretty awesome!';

  constructor(private renderer: Renderer2, 
    private cd: ChangeDetectorRef) {
    this.filteredPersons = this.PersonControl.valueChanges.pipe(
      map(data => {
        if(this.allPersons.indexOf(data)=== -1 ){
          this.current = data
        }
        
        return data?.indexOf('@') !== -1 ? this.allPersons : [];
        
      })
    );
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    let inputValue = this.current?.slice(0,this.current.length-1)
    let selectedValue = event.option.viewValue
     this.PersonControl.setValue(inputValue + selectedValue) 
    // let index = this.PersonControl.value.indexOf(selectedValue)
     this.addTags()
  }
  
  addTags() {
    this.tags = [];
    const matchMentions = /(Gina Williams|Jake Williams|Jamie John|John Doe|Jeff Stewart|Paula M. Keith)/g;

    let mention;
    let count=0
    while ((mention = matchMentions.exec(this.PersonControl.value))) {
      console.log(mention)
      this.tags.push({
        indices: {
          start: mention.index,
          end: mention.index + mention[1].length
        },
        data: mention[1]
      });
      count++
    }
    console.log(count)
  }
}
