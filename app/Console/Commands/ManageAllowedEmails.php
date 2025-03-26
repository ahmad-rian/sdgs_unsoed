<?php

namespace App\Console\Commands;

use App\Models\AllowedEmail;
use Illuminate\Console\Command;

class ManageAllowedEmails extends Command
{
    protected $signature = 'email:manage {action=list} {email?}';
    protected $description = 'Mengelola email yang diizinkan untuk login (list, add, remove)';

    public function handle()
    {
        $action = $this->argument('action');
        $email = $this->argument('email');

        switch ($action) {
            case 'list':
                $this->listEmails();
                break;
            case 'add':
                $this->addEmail($email);
                break;
            case 'remove':
                $this->removeEmail($email);
                break;
            default:
                $this->error("Aksi tidak dikenal: {$action}");
                return 1;
        }

        return 0;
    }

    private function listEmails()
    {
        $emails = AllowedEmail::orderBy('email')->get();
        $this->info('Daftar email yang diizinkan:');

        if ($emails->isEmpty()) {
            $this->warn('Tidak ada email yang diizinkan.');
            return;
        }

        $this->table(['ID', 'Email', 'Dibuat pada'], $emails->map(function ($email) {
            return [
                'id' => $email->id,
                'email' => $email->email,
                'created_at' => $email->created_at->format('Y-m-d H:i:s')
            ];
        }));
    }

    private function addEmail($email)
    {
        if (!$email) {
            $email = $this->ask('Masukkan email yang akan ditambahkan:');
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->error("Format email tidak valid: {$email}");
            return;
        }

        $exists = AllowedEmail::where('email', $email)->exists();
        if ($exists) {
            $this->warn("Email sudah terdaftar: {$email}");
            return;
        }

        AllowedEmail::create(['email' => $email]);
        $this->info("Email berhasil ditambahkan: {$email}");
    }

    private function removeEmail($email)
    {
        if (!$email) {
            $email = $this->ask('Masukkan email yang akan dihapus:');
        }

        $record = AllowedEmail::where('email', $email)->first();
        if (!$record) {
            $this->error("Email tidak ditemukan: {$email}");
            return;
        }

        $record->delete();
        $this->info("Email berhasil dihapus: {$email}");
    }
}
