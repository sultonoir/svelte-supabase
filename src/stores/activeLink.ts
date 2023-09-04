// activeSectionStore.ts
import { writable, type Unsubscriber, type Writable } from 'svelte/store';

// Definisikan tipe data untuk keadaan global
interface GlobalState {
	activeSection: string;
	timeOfLastClick: number;
}

// Buat inisialisasi keadaan awal
const initialGlobalState: GlobalState = {
	activeSection: 'Home',
	timeOfLastClick: 0
};

// Buat "stores" Svelte
export const activeSection: Writable<string> = writable(initialGlobalState.activeSection);
export const timeOfLastClick: Writable<number> = writable(initialGlobalState.timeOfLastClick);

// Svelte store yang sesuai dengan konteks Anda
export const activeSectionStore = {
	subscribe: (callback: (value: GlobalState) => Unsubscriber): Unsubscriber => {
		const unsubscribe1 = activeSection.subscribe((activeSectionValue: string) => {
			callback({ ...initialGlobalState, activeSection: activeSectionValue });
		});
		const unsubscribe2 = timeOfLastClick.subscribe((timeOfLastClickValue: number) => {
			callback({ ...initialGlobalState, timeOfLastClick: timeOfLastClickValue });
		});

		return () => {
			unsubscribe1();
			unsubscribe2();
		};
	},
	set: (newActiveSection: string, newTimeOfLastClick: number): void => {
		activeSection.set(newActiveSection);
		timeOfLastClick.set(newTimeOfLastClick);
	}
};
