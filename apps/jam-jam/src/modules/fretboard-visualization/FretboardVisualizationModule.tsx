import {
  GuitarComponent,
  LayoutComponent,
  ScalePickerComponent,
} from "./components";
import {
  GuitarProvider,
  GuitarTuningsProvider,
  NotesPlayProvider,
} from "./providers";

const FretboardVisualizationModule = () => {
  return (
    <NotesPlayProvider>
      <GuitarTuningsProvider>
        <GuitarProvider>
          <LayoutComponent>
            <ScalePickerComponent />
            <GuitarComponent />
          </LayoutComponent>
        </GuitarProvider>
      </GuitarTuningsProvider>
    </NotesPlayProvider>
  );
};
export default FretboardVisualizationModule;
