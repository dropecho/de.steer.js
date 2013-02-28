desc "Compiles the js"
task :default => [:build]
	

desc "compiles"
task :build do
	sh 'java -jar compiler/compiler.jar'
end
