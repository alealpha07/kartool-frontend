import axios from 'axios';
const BASE_URL: string = import.meta.env.VITE_BASE_URL;
import { locale, waitLocale } from 'svelte-i18n';
await waitLocale();
let currentLocale: string;
$: locale.subscribe((value) => {
	currentLocale = value as string;
});

class FileService {
	public static FileTypes = {
		vehicleImage: 'vehicleImageFileExtension',
		registrationCard: 'registrationCardFileExtension',
		maintenance: 'maintenanceFileExtension',
		insurance: 'insuranceFileExtension'
	};

	static upload(file: FormData, vehicleId: Number, type: string) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${BASE_URL}/upload?id=${vehicleId}&type=${type}&lang=${currentLocale}`, file, {
					withCredentials: true,
					headers: { 'Content-Type': 'multipart/form-data' }
				});
				const data = res.data;
				resolve(data);
			} catch (error) {
				reject(error);
			}
		});
	}

	static get(vehicleId: Number, type: string) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(`${BASE_URL}/upload?id=${vehicleId}&type=${type}&lang=${currentLocale}`, {
					withCredentials: true,
					responseType: 'blob'
				});
				let url = URL.createObjectURL(new Blob([res.data]));
				resolve(url);
			} catch (error) {
				reject(error);
			}
		});
	}
}

export default FileService;
