import { VideoProject, MediaAsset, UserVideoMetadata } from '../types';
import { SEED_PROJECTS, SEED_ASSETS, SEED_USER_VIDEOS } from '../data/seedData';

const STORAGE_KEYS = {
  PROJECTS: 'omnivideo_projects_v1',
  ASSETS: 'omnivideo_assets_v1',
  USER_VIDEOS: 'omnivideo_user_videos_v1',
  GUEST_MODE: 'omnivideo_guest_mode_v1',
  USER: 'omnivideo_user_v1'
};

class StorageService {
  getProjects(): VideoProject[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!raw) {
      this.saveProjects(SEED_PROJECTS);
      return SEED_PROJECTS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return SEED_PROJECTS;
    }
  }

  saveProjects(projects: VideoProject[]) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }

  saveProject(project: VideoProject) {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === project.id);
    if (index >= 0) {
      projects[index] = { ...project, updatedAt: Date.now() };
    } else {
      projects.unshift({ ...project, createdAt: Date.now(), updatedAt: Date.now() });
    }
    this.saveProjects(projects);
  }

  deleteProject(id: string) {
    const projects = this.getProjects().filter(p => p.id !== id);
    this.saveProjects(projects);
  }

  getAssets(): MediaAsset[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ASSETS);
    if (!raw) {
      this.saveAssets(SEED_ASSETS);
      return SEED_ASSETS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return SEED_ASSETS;
    }
  }

  saveAssets(assets: MediaAsset[]) {
    localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(assets));
  }

  addAsset(asset: MediaAsset) {
    const assets = this.getAssets();
    assets.unshift(asset);
    this.saveAssets(assets);
  }

  getUserVideos(): UserVideoMetadata[] {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_VIDEOS);
    if (!raw) {
      this.saveUserVideos(SEED_USER_VIDEOS);
      return SEED_USER_VIDEOS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return SEED_USER_VIDEOS;
    }
  }

  saveUserVideos(videos: UserVideoMetadata[]) {
    localStorage.setItem(STORAGE_KEYS.USER_VIDEOS, JSON.stringify(videos));
  }

  addUserVideo(video: UserVideoMetadata) {
    const list = this.getUserVideos();
    list.unshift(video);
    this.saveUserVideos(list);
  }

  deleteUserVideo(id: string) {
    const list = this.getUserVideos().filter(v => v.id !== id);
    this.saveUserVideos(list);
  }

  getUser(): { email: string; name: string } | null {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  setUser(user: { email: string; name: string } | null) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }
}

export const storage = new StorageService();
