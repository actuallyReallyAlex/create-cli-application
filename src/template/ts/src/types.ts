import EventEmitter from "events";
import Configstore from "configstore";

/**
 * Application State
 */
export interface AppState {
  config: Configstore;
  menuAction: MenuAction;
  menuActionEmitter: EventEmitter.EventEmitter;
}

export type MenuAction =
  | "about"
  | "exit"
  | "option1"
  | "option2"
  | "option3"
  | null;
