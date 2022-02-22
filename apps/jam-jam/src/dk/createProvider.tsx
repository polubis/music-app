import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { error } from "dk";

type UnknownObject = Record<string, unknown>;

type Action<S extends UnknownObject> = (state: S) => Partial<S>;

type Actions<S extends UnknownObject> = Record<string, Action<S>>;

type Context<S extends UnknownObject, A extends Actions<S>> = S & A;

interface ProviderProps {
  children: ReactNode;
}

export const createProvider = <S extends UnknownObject, A extends Actions<S>>(
  initState: S,
  actions: A,
  name: string
) => {
  const useContextManagement = (): Context<S, A> => {
    const [state, setState] = useState(initState);

    const context = useMemo(() => {
      const enhancedActions = Object.entries(actions).reduce<A>(
        (acc, [key, action]) => ({
          ...acc,
          [key]: () => {
            const newState = { ...state, ...action(state) };
            setState(newState);
            return newState;
          },
        }),
        {} as A
      );

      return {
        ...state,
        ...enhancedActions,
      };
    }, [state]);

    return context;
  };

  const Context = createContext<Context<S, A> | null>(null);

  const Provider = ({ children }: ProviderProps) => {
    const context = useContextManagement();

    return <Context.Provider value={context}>{children}</Context.Provider>;
  };

  const useProvider = () => {
    const context = useContext(Context);

    if (context === null) {
      throw error("LACK_OF_PROVIDER", `There is lack of provider with ${name}`);
    }

    return context;
  };

  return [Provider, useProvider] as const;
};
