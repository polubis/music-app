import { useMemo } from "react";
import { Subject } from "rxjs";

export const useSubject = <T>() => {
  const subjects = useMemo(() => {
    const subject = new Subject<T>();
    return [subject, subject.asObservable()] as const;
  }, []);

  return subjects;
};
