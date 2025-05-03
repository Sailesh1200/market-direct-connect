
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/profile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data as Profile);
    };

    fetchProfile();
  }, [user, navigate]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Email</h3>
            <p>{user?.email}</p>
          </div>
          <div>
            <h3 className="font-medium">Date of Birth</h3>
            <p>{profile.date_of_birth || 'Not provided'}</p>
          </div>
          <div>
            <h3 className="font-medium">State</h3>
            <p>{profile.state || 'Not provided'}</p>
          </div>
          <div>
            <h3 className="font-medium">District</h3>
            <p>{profile.district || 'Not provided'}</p>
          </div>
          <div>
            <h3 className="font-medium">Mobile Number</h3>
            <p>{profile.mobile_number || 'Not provided'}</p>
          </div>
          <div>
            <h3 className="font-medium">Gender</h3>
            <p>{profile.gender || 'Not provided'}</p>
          </div>
          <div>
            <h3 className="font-medium">Occupation</h3>
            <p>{profile.occupation || 'Not provided'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
