import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IUser} from '../interfaces/user.interface';
import {map, share} from 'rxjs/operators';
import {ApiService} from "./api.service";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _subjectToken: BehaviorSubject<string>;
  private _subjectTasks: BehaviorSubject<string>;

  constructor(private api: ApiService, private readonly router: Router) {
    this._subjectToken = new BehaviorSubject<string>(localStorage.getItem('token'));
    this._subjectTasks = new BehaviorSubject<string>(localStorage.getItem('tasks'));
  }

  get isAuthenticated() {
    return this._subjectToken.asObservable()
      .pipe(
        map(i => Boolean(i))
      );
  }

  /*
   * Comprobar la existencia de un token
   * @return {boolean}
   */
  public get hasToken() {
    return Boolean(this._subjectToken.getValue());
  }

  /*
   * Guardar token
   */
  public set token(token: string) {
    localStorage.setItem('token', token);
    this._subjectToken.next(token);
  }

  /*
   * Traer token
   */
  public get token(): string {
    return this._subjectToken.getValue();
  }

  /*
   * Guardar tasks
   */
  public set tasks(tasks: any) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this._subjectTasks.next(tasks);
  }

  public login(user: any) {
    const data = {
      email: user.email,
      password: user.password
    };
    const observer = this.api.post('login', data)
      .pipe(share());
    let dUser: any;
    observer.subscribe(
      d => (dUser = d),
      () => {
      },
      () => {
        this.token = (dUser as IUser).token;
        this.tasks = (dUser as IUser).tasks;
      });
    return observer;
  }

  public register(user: any) {
    const data = {
      email: user.email,
      name: user.name,
      password: user.password
    };
    const observer = this.api.post('register', data)
      .pipe(share());
    let dUser: any;
    observer.subscribe(
      d => (dUser = d),
      () => {
      },
      () => {
        //this.token = (dUser as IUser).token;
        //this.tasks = (dUser as IUser).tasks;
      });
    return observer;
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
