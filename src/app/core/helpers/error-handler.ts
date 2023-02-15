import {throwError} from 'rxjs';
import {humanize} from '@core/utils/humanize-slug';

export function ErrorHandler(error: any) {


  let errorMessage = [`SOMETHING WENT WRONG!`];

  if (error?.error?.message && !Array.isArray(error?.error?.message)) {
    errorMessage = [];

    if (typeof error.error.message === 'string') {
      errorMessage.push(error.error.message);
    } else {
      const keys = Object.keys(error.error.message);

      if (keys.length) {

        for (const key in error.error.message) {
          errorMessage.push(`\n${humanize(key)}: ${error.error.message[key][0]}`);
        }

      } else {
        error?.error?.message?.forEach((message: any) => {
          errorMessage.push(`\n ${message}`);

        });
      }
    }


  } else if (error.error.message && error.error?.message?.length && error.error?.message?.length > 0) {
    errorMessage = [];
    errorMessage.push(error?.error?.message);
  } else {
    errorMessage = [];
    for (const key in error.error.message) {
      errorMessage.push(`\n${humanize(key)}: ${error.error.message[key][0]}`);
    }
  }

  return throwError(errorMessage);
}

// --------------- OBSOLETE FUNCTION ---------------
// Below code will remain here until next refactoring
// -------------------------------------------------

// export function errorHandler(error: any) {
//   let errorMessage = '';
//   if (error.error instanceof ErrorEvent) {
//     errorMessage = error.error.message;
//
//   } else {
//     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     if (error.status == 412) {
//       errorMessage = `Update the ETag`;
//     }
//   }
//   return throwError(errorMessage);
// }
