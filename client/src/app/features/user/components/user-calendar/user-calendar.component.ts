import { Component, OnInit } from '@angular/core';
import {
  CalendarOptions,
  defineFullCalendarElement,
} from '@fullcalendar/web-component';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { ReservationsService } from 'src/app/services/reservations.service';
import * as moment from 'moment';
import * as $ from 'jquery';
import { SpaceService } from 'src/app/services/space.service';
import { Space } from 'src/app/models/space/space';


defineFullCalendarElement();

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss'],
})
export class UserCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions;
  space: Space[] ;
  events: any = [];

  constructor(
    private reservationService: ReservationsService,
    private spaceService: SpaceService
  ) {}

  ngOnInit(): void {
    this.getSpaces();
    this.getReservations();
  }

  //Get all spaces
  getSpaces() {
    this.spaceService.getAllSpaces().subscribe({
      next: (response) => {
        this.space = response;
        this.formatResource(this.space);
        
      },
    });
  }

  //Get all reservations
  getReservations() {
    this.reservationService.getAllReservations().subscribe({
      next: (response) => {
        this.formatEvents(response);
      },
    });
  }

  // Format Events
  formatEvents(data: any) {
    let array = [];
    for (let i = 0; i < data.length; i++) {
      let event = {
        resourceId: `${data[i].reservedSpace.spaceId}`,
        id: `${data[i].reservationId}`,
        title: data[i].reservationTitle,
        start: moment.utc(data[i].startsAt).local().format(),
        end: moment.utc(data[i].endsAt).local().format(),
      };
      array.push(event);
    }

    this.events = array;
    this.formatResource(this.space);
  }

  // Formatting space array
  formatResource(value: Space[]) {
    let array = [];
    for (let i = 0; i < value.length; i++) {
      let space = {
        id: value[i].spaceId.toString(),
        spaceName: value[i].spaceName,
        spaceCategoryName: value[i].spaceCategory.spaceCategoryName,
      };
      array.push(space);
    }

    //Intiailize calendar options
    this.initializeCalendarOptions(array, this.events);
  }


  //To Initialize calendar options
  initializeCalendarOptions(resources: any[], events: any[]) {
    this.calendarOptions = {
      eventMinWidth: 100,
      slotMinTime: '09:00:00',
      slotMaxTime: '19:00:00',
      plugins: [resourceTimelinePlugin],
      initialView: 'resourceTimelineDay',
      headerToolbar: false,
      contentHeight: 'auto',
      resourceAreaColumns: [
        {
          group: true,
          field: 'spaceCategoryName',
          headerContent: 'Space Category',
        },
        {
          field: 'spaceName',
          headerContent: 'Space Name',
        },
      ],
      resources: resources,
      events: events,
      eventBackgroundColor: '#50C878',
      eventBorderColor: '#50C878',
      eventMouseEnter: function (info) {
        let start = moment.utc(info.event._instance?.range.start).format('LT');
        let end = moment.utc(info.event._instance?.range.end).format('LT');
        let title = info.event._def.title;

        //Tool tip component
        var tooltip = `
        <div class="tooltipevent text-white"
         style="padding:1rem;background:${info.el.style.backgroundColor};position:absolute;z-index:10001;text-align:center"
         >
          <small class="mt-2 fw-bold">${title}</small>
          <div >
          <small>Start Time</small>
          <small>${start}</small>
          </div
          <div>
          <small >End Time</small>
          <small>${end}<small>
          </div>
         
          </div>`;
        $('body').append(tooltip);
        $(info.el)
          .mouseover(function (e) {
            $(this).css('z-index', 10000);
            $('.tooltipevent').fadeIn('500');
            $('.tooltipevent').fadeTo(10, 1.9);
          })
          .mousemove(function (e) {
            $('.tooltipevent').css('top', e.pageY + 10);
            $('.tooltipevent').css('left', e.pageX + 20);
          });
      },

      eventMouseLeave: function (event) {
        $(event.el).css('z-index', 8);
        $('.tooltipevent').remove();
      },
    };
  }
}
