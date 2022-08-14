import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent, TreeNode } from 'primeng/api';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-admin-team-list',
  templateUrl: './admin-team-list.component.html',
})
export class AdminTeamListComponent implements OnInit {
  teamDetails: TreeNode[] = [];

  data1: TreeNode[];

  // pagination: Pagination;
  // pageNumber = 1;
  // pageSize = 5;

  // userParams: UserParams;
  loading: boolean;

  constructor(private router: Router, private teamService: TeamService) {}

  ngOnInit(): void {
    this.loading = true;
    this.getTeamDetails();
    // load team
    this.data1 = [
      {
        label: 'CEO',
        type: 'person',
        styleClass: 'p-person',
        expanded: true,
        data: { name: 'Gowtham SP', avatar: 'walter.jpg' },
        children: [
          {
            label: 'CFO',
            type: 'person',
            styleClass: 'p-person',
            expanded: true,
            data: { name: 'Saul Goodman', avatar: 'saul.jpg' },
            children: [
              {
                label: 'Tax',
                styleClass: 'department-cfo',
              },
              {
                label: 'Legal',
                styleClass: 'department-cfo',
              },
            ],
          },
          {
            label: 'COO',
            type: 'person',
            styleClass: 'p-person',
            expanded: true,
            data: { name: 'Mike E.', avatar: 'mike.jpg' },
            children: [
              {
                label: 'Operations',
                styleClass: 'department-coo',
                expanded: true,
                children: [
                  {
                    label: 'Analysis',
                    styleClass: 'department-cto',
                  },
                  {
                    label: 'Front End',
                    styleClass: 'department-cto',
                  },
                  {
                    label: 'Back End',
                    styleClass: 'department-cto',
                  },
                ],
              },
            ],
          },
          {
            label: 'CTO',
            type: 'person',
            styleClass: 'p-person',
            expanded: true,
            data: { name: 'Jesse Pinkman', avatar: 'jesse.jpg' },
            children: [
              {
                label: 'Development',
                styleClass: 'department-cto',
                expanded: true,
                children: [
                  {
                    label: 'Analysis',
                    styleClass: 'department-cto',
                  },
                  {
                    label: 'Front End',
                    styleClass: 'department-cto',
                  },
                  {
                    label: 'Back End',
                    styleClass: 'department-cto',
                  },
                ],
              },
              {
                label: 'QA',
                styleClass: 'department-cto',
              },
              {
                label: 'R&D',
                styleClass: 'department-cto',
              },
            ],
          },
        ],
      },
    ];
  }

  sample(name: string) {
    return name.charAt(0) + name.charAt(1);
  }

  nextPage(event: LazyLoadEvent) {
    // load space
    this.loading = true;
    // event.first = 0;
    // event.rows = 3;
    // event.sortField = '';
    // event.sortOrder = -1;
    //filters:{}
    // //API call here

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  getTeamDetails() {
    this.teamService.getTeamDetails().subscribe({
      next: (response: any) => {
        console.log('Component ', response);

        // level 0
        let c: TreeNode = {
          label: 'Space360',
          type: 'node',
          styleClass: 'p-person',
          expanded: true,
          data: { name: 'space360' },
          children: [],
        };
        this.teamDetails = [c];

        // level 1
        response.forEach((el) => {
          let lc: TreeNode = {
            label: el.teamName,
            type: 'node',
            styleClass: 'department-cfo',
            expanded: true,
            data: { name: el.teamName },
            children: [],
          };

          el.subTeams.forEach((sb) => {
            let sc: TreeNode = {
              label: sb.subTeamName,
              type: 'node',
              styleClass: 'p-subteam',
              expanded: true,
              data: { name: sb.subTeamName },
              children: [],
            };

            sb.users.forEach((uc) => {
              let ucc: TreeNode = {
                label: uc.firstName,
                type: 'node',
                styleClass: 'p-users',
                expanded: true,
                data: { name: uc.firstName },
                children: [],
              };
              sc.children.push(ucc);
            });

            lc.children.push(sc);
          });

          this.teamDetails[0].children.push(lc);
        });

        // response.forEach(rootElement => {

        // });
      },
    });
  }

  mouseDown = false;

  startX: any;

  scrollLeft: any;

  slider = document.querySelector<HTMLElement>('.parent');

  startDragging(e, flag, el) {
    this.mouseDown = true;
    this.startX = e.pageX - el.offsetLeft;
    this.scrollLeft = el.scrollLeft;
  }
  stopDragging(e, flag) {
    this.mouseDown = false;
  }
  moveEvent(e, el) {
    e.preventDefault();
    if (!this.mouseDown) {
      return;
    }
    // console.log(e);
    const x = e.pageX - el.offsetLeft;
    const scroll = x - this.startX;
    el.scrollLeft = this.scrollLeft - scroll;
  }

  moveToTeamCreate() {
    this.router.navigateByUrl('/admin/team/create');
  }

  moveToTeamCategoryCreate() {
    this.router.navigateByUrl('/admin/team/create/sub-team-form');
  }
}
