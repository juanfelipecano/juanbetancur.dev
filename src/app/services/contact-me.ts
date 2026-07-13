import { Service } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Service()
export class ContactMe {

    public async perform(body: { name: string; email: string; message: string }): Promise<boolean> {
        const supabase = this.getSupabaseClient();

        const { error } = await supabase.functions.invoke('contact-me', {
            body: JSON.stringify(body),
        });

        return !error;
    }

    protected getSupabaseClient(): SupabaseClient {
        const { projectUrl, publishableKey } = environment.supabase;

        return createClient(projectUrl, publishableKey);
    }
}
