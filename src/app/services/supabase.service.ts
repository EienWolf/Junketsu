import { Injectable } from '@angular/core'
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import { environment } from '../../enviroments/eviroment'

export interface Profile {
  id?: string
  username: string
  website: string
  avatar_url: string
  config_url: string
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient
  _session: AuthSession | null = null

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    })
    return this._session;
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url, config_url`)
      .eq('id', user.id).limit(1)
      .single()
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    }

    return this.supabase.from('profiles').upsert(update).then((result)=>{
      console.log(result);
    });
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file)
  }

  downLoadConfig(path: string): Promise<{data: Blob; error: null;} 
    | {data: null; error: any;}>{
    return this.supabase.storage.from('configs').download(path)
  }

  uploadConfig(file: File) {
    if (this.session) {
      //const filePath = `${Math.random()}.json`;
      const { user } = this.session;
      this.profile(user).then((result) => {
        let random = `${Math.random()}`;
        let filePath = result.data?.config_url || random.toString() + '.json';
        let username = result.data?.username || random.toString();
        this.supabase.storage.from('configs').update(filePath, file);
        this.updateProfile({
          id: user.id,
          username: username,
          website: '',
          avatar_url: '',
          config_url: filePath
        });
      })
      
    }
    
  }
}