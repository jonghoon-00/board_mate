import supabase from '@/supabase/supabaseClient';

/**
 * 회원가입기능
 * @param {object} inputData email과 password가 담긴 object
 * @returns {object} data
 */
export const signUpWithSupabase = async (inputData) => {
  const { data, error } = await supabase.auth.signUp(inputData);
  if (error) throw error;
  return data;
};

export const signInWithSupabase = async (inputData) => {
  const { data, error } = await supabase.auth.signInWithPassword(inputData);
  if (error) throw error;
  return data;
};

export const signOutWithSupabase = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return;
};

export const getSessionWithSupabase = async () => {
  const { data: user } = await supabase.auth.getSession();
  return user;
};

export const createProfileWithSupabase = async (profileData) => {
  const { data: result } = await supabase.from('users').insert(profileData);
  return result;
};

export const updateProfileWithSupabase = async (profileData, id) => {
  const { data: result } = await supabase.from('users').update(profileData).eq('id', id);
  return result;
};

export const getUser = async () => {
  const { data } = await supabase.auth.getUser();
  const { data: user } = await supabase.from('users').select('*').eq('id', data.user.id).single();
  return user;
};
