import Debugmate from './debugmate';
import { DebugmateProvider, useDebugmateContext } from './Providers/DebugmateProvider';
import { useDebugmateState } from './contexts/Debugmate';
import ErrorBoundary from './component/ErrorBoundary';


export { DebugmateProvider, useDebugmateContext, useDebugmateState, ErrorBoundary };
export default Debugmate;