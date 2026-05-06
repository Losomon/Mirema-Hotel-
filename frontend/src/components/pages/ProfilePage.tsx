import { useMember } from '@/integrations';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

export default function ProfilePage() {
  const { member, actions } = useMember();

  const getInitials = () => {
    const firstName = member?.contact?.firstName || '';
    const lastName = member?.contact?.lastName || '';
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    if (member?.profile?.nickname) {
      return member.profile.nickname.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  const getDisplayName = () => {
    const firstName = member?.contact?.firstName || '';
    const lastName = member?.contact?.lastName || '';
    if (firstName || lastName) {
      return `${firstName} ${lastName}`.trim();
    }
    return member?.profile?.nickname || 'Guest';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-primary/90" />
        <div className="relative z-10 text-center px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-5xl md:text-6xl text-primary-foreground mb-6"
          >
            My Profile
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl text-primary-foreground/90 max-w-2xl mx-auto"
          >
            Manage your account information
          </motion.p>
        </div>
      </section>

      {/* Profile Content */}
      <section className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-primary/20">
              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-6">
                  <Avatar className="w-32 h-32 border-4 border-primary/20">
                    <AvatarImage src={member?.profile?.photo?.url} alt={getDisplayName()} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-heading">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="font-heading text-3xl text-primary">
                  {getDisplayName()}
                </CardTitle>
                {member?.profile?.title && (
                  <CardDescription className="font-paragraph text-lg mt-2">
                    {member.profile.title}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Account Information */}
                <div className="space-y-4">
                  <h3 className="font-heading text-2xl text-primary mb-4">Account Information</h3>

                  {/* Email */}
                  {member?.loginEmail && (
                    <div className="flex items-center gap-4 p-4 bg-light-gray-background rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-paragraph text-sm text-foreground/70">Email Address</p>
                        <p className="font-paragraph text-base text-foreground font-medium">
                          {member.loginEmail}
                        </p>
                        {member.loginEmailVerified && (
                          <span className="inline-block mt-1 text-xs font-paragraph text-primary">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Nickname */}
                  {member?.profile?.nickname && (
                    <div className="flex items-center gap-4 p-4 bg-light-gray-background rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-paragraph text-sm text-foreground/70">Username</p>
                        <p className="font-paragraph text-base text-foreground font-medium">
                          {member.profile.nickname}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Member Since */}
                  {member?._createdDate && (
                    <div className="flex items-center gap-4 p-4 bg-light-gray-background rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-paragraph text-sm text-foreground/70">Member Since</p>
                        <p className="font-paragraph text-base text-foreground font-medium">
                          {format(new Date(member._createdDate), 'MMMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Account Status */}
                  {member?.status && (
                    <div className="flex items-center gap-4 p-4 bg-light-gray-background rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-paragraph text-sm text-foreground/70">Account Status</p>
                        <p className="font-paragraph text-base text-foreground font-medium">
                          {member.status === 'APPROVED' ? 'Active' : member.status}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-primary/10">
                  <Button
                    onClick={actions.logout}
                    variant="outline"
                    className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground font-paragraph"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>

                {/* Info Note */}
                <div className="bg-accent-gold/10 p-6 rounded-lg">
                  <p className="font-paragraph text-sm text-foreground/70 text-center">
                    📌 To update your profile information, please contact our support team or manage your account through your Wix account settings.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
