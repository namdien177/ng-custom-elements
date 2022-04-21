import { Subject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

/**
 * Better way to destroy service in component
 * instead of use subject and ngOnDestroy component
 *
 * We creates many lines of code by using
 * ```ts
 * destroy$ = new Subject<void>();
 *
 * ngOnDestroy() {
 *  this.destroy$.next();
 * }
 * ```
 *
 * We can use
 * ```ts
 * @Component({
 * providers: [DestroyService]
 * })
 * export class ExampleComponent {
 *  constructor(@Inject(DestroyService) private destroy$: Subject<void>){}
 * }
 * ```
 */
@Injectable()
export class DestroyService extends Subject<void> implements OnDestroy {
  ngOnDestroy(): void {
    this.next();
  }
}
