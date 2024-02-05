import { inject } from "@angular/core";
import { JobOfferService } from "@shared/services";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { jobOffersPageActions } from "./actions/jobOffers-page.actions";
import { catchError, concatMap, exhaustMap, map, of, tap } from "rxjs";
import { jobOffersApiActions } from "./actions/jobOffers-api.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

/**
 * Load Job Offers Effect
 * 
 * this effect handles the load of job offers process by intercepting the {@link jobOffersPageActions.enter} action,
 * calling the 'readAll' from the {@link JobOfferService}, and dispatching the corresponding
 * actions based on the outcome either {@link jobOffersApiActions.jobOffersLoadedSuccess} or {@link jobOffersApiActions.jobOffersLoadedFailure}.
 * 
 * @param actions$ - The stream of actions in the application.
 * @param jobOfferService - The injected {@link JobOfferService} responsible for Job Offers.
 * @returns An observable of actions representing the registration process.
 */
export const loadJobOffersEffect = createEffect((
    actions$ = inject(Actions),
    jobOfferService = inject(JobOfferService)
) => {
    return actions$.pipe(
        ofType(jobOffersPageActions.enter),
        exhaustMap((action) => {
            return jobOfferService.readAll(action.page).pipe(
                map((jobOffers: any) => {
                    return jobOffersApiActions.jobOffersLoadedSuccess({ 
                        jobOffers: jobOffers.content, 
                        pageInfo: {
                            currentPage: jobOffers.number, 
                            first: jobOffers.first, 
                            last: jobOffers.last, 
                            totalElements: jobOffers.totalElements, 
                            totalPages: jobOffers.totalPages
                        } 
                    });
                }),
                catchError((error) => {
                    return of(jobOffersApiActions.jobOffersLoadedFailure({errors: error}));
                })
            )
        })
    )
}, {functional: true})

/**
 * add Offer Effect
 * 
 * this effect handles the addition of job offers process by intercepting the {@link jobOffersPageActions.addJobOffer} action,
 * calling the 'create' from the {@link JobOfferService}, and dispatching the corresponding
 * actions based on the outcome either {@link jobOffersApiActions.jobOfferAddedSuccess} or {@link jobOffersApiActions.jobOfferAddedFailure}.
 * 
 * @param actions$ - The stream of actions in the application.
 * @param jobOfferService - The injected {@link JobOfferService} responsible for Job Offers.
 * @returns An observable of actions representing the registration process.
 */
export const addJobOfferEffect = createEffect((
    actions$ = inject(Actions),
    jobOfferService = inject(JobOfferService)
) => {
    return actions$.pipe(
        ofType(jobOffersPageActions.addJobOffer),
        concatMap((action) => jobOfferService.create(action.jobOffer).pipe(
            map((offer) => {
                return jobOffersApiActions.jobOfferAddedSuccess({jobOffer: offer});
            }),
            catchError((error: any) => {
                return of(jobOffersApiActions.jobOfferAddedFailure({
                    errors: error.error,
                    errorMessage: {message: error.error?.body?.detail}
                }))
            })
        ))
    )
}, {functional: true})

export const redirectOnFailure = createEffect((
    actions$ = inject(Actions),
    router = inject(Router)
) => {
    return actions$.pipe(
        ofType(jobOffersApiActions.jobOfferAddedFailure),
        tap((action) => {
            if (action.errorMessage.message === "unverified") {
                router.navigateByUrl("/auth/verify");
            } else if (action.errors["statusCode"] === "PAYMENT_REQUIRED") {
                router.navigateByUrl("/plans");
            }
        })
    )
}, {functional: true, dispatch: false})